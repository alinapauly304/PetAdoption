import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
} from '@mui/material';
import axios from 'axios';

function ShelterAdoptionRequests() {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem('token');
      const shelterId = localStorage.getItem('userId');
      const response = await axios.get(`http://localhost:8081/api/adoption-requests/shelter/${shelterId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(response.data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const handleRespond = (request) => {
    setSelectedRequest(request);
    setResponse('');
    setOpenDialog(true);
  };

  const handleClose = () => {
    setSelectedRequest(null);
    setResponse('');
    setOpenDialog(false);
    setError('');
  };

  const handleSubmit = async (status) => {
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:8081/api/adoption-requests/${selectedRequest.requestId}/status`,
        {
          status,
          response,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchRequests();
      handleClose();
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred while updating the request');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'APPROVED':
        return 'success';
      case 'REJECTED':
        return 'error';
      default:
        return 'warning';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Adoption Requests
      </Typography>

      <Grid container spacing={4}>
        {requests.map((request) => (
          <Grid item key={request.requestId} xs={12}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" component="h2">
                    Request for {request.pet?.name}
                  </Typography>
                  <Chip
                    label={request.status}
                    color={getStatusColor(request.status)}
                    size="small"
                  />
                </Box>
                
                <Typography color="text.secondary" gutterBottom>
                  From: {request.adopter?.name}
                </Typography>
                <Typography variant="body2" paragraph>
                  Contact: {request.adopter?.email} | {request.adopter?.phone}
                </Typography>
                <Typography variant="body2" paragraph>
                  Message: {request.message}
                </Typography>
                {request.response && (
                  <Typography variant="body2" color="text.secondary">
                    Your Response: {request.response}
                  </Typography>
                )}

                {request.status === 'PENDING' && (
                  <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleRespond(request)}
                    >
                      Respond
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}

        {requests.length === 0 && (
          <Grid item xs={12}>
            <Typography variant="h6" align="center" color="text.secondary">
              No adoption requests found
            </Typography>
          </Grid>
        )}
      </Grid>

      <Dialog open={openDialog} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Respond to Adoption Request</DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Your Response"
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              multiline
              rows={4}
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => handleSubmit('REJECTED')}
            color="error"
            disabled={loading}
          >
            Reject
          </Button>
          <Button
            onClick={() => handleSubmit('APPROVED')}
            variant="contained"
            color="success"
            disabled={loading}
          >
            Approve
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default ShelterAdoptionRequests; 