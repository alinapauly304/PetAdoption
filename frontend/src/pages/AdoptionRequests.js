import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Grid,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import axios from 'axios';

function AdoptionRequests() {
  const [requests, setRequests] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [response, setResponse] = useState('');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/adoption-requests');
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching adoption requests:', error);
      }
    };

    fetchRequests();
  }, []);

  const handleOpenDialog = (request) => {
    setSelectedRequest(request);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRequest(null);
    setResponse('');
  };

  const handleSubmitResponse = async () => {
    try {
      await axios.put(`http://localhost:8080/api/adoption-requests/${selectedRequest.id}`, {
        status: 'RESPONDED',
        response: response,
      });
      handleCloseDialog();
      // Refresh requests
      const response = await axios.get('http://localhost:8080/api/adoption-requests');
      setRequests(response.data);
    } catch (error) {
      console.error('Error responding to adoption request:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING':
        return 'warning';
      case 'APPROVED':
        return 'success';
      case 'REJECTED':
        return 'error';
      case 'RESPONDED':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Adoption Requests
      </Typography>

      <Grid container spacing={4}>
        {requests.map((request) => (
          <Grid item key={request.id} xs={12}>
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
                  Message: {request.message}
                </Typography>
                {request.response && (
                  <Typography variant="body2" color="text.secondary">
                    Response: {request.response}
                  </Typography>
                )}
              </CardContent>
              <CardActions>
                {request.status === 'PENDING' && (
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => handleOpenDialog(request)}
                  >
                    Respond
                  </Button>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Response Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Respond to Adoption Request</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Your Response"
            fullWidth
            multiline
            rows={4}
            value={response}
            onChange={(e) => setResponse(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmitResponse} variant="contained">
            Submit Response
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default AdoptionRequests; 