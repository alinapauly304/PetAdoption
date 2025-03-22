import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  CircularProgress,
  Chip,
} from '@mui/material';
import axios from 'axios';

const ManageAdoptionRequests = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      if (!token || !userId) {
        setError('Please log in to view requests');
        navigate('/login/shelter');
        return;
      }

      const response = await axios.get(
        `http://localhost:8080/api/adoption-requests/shelter/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setRequests(response.data);
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Please log in to view requests');
        navigate('/login/shelter');
      } else {
        setError('Failed to fetch adoption requests. Please try again.');
      }
    } finally {
      setFetching(false);
    }
  };

  const handleOpenDialog = (request) => {
    setSelectedRequest(request);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRequest(null);
    setResponse('');
    setError('');
    setSuccess('');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING':
        return 'warning';
      case 'APPROVED':
        return 'success';
      case 'REJECTED':
        return 'error';
      default:
        return 'default';
    }
  };

  const handleSubmitResponse = async () => {
    if (!response.trim()) {
      setError('Please provide a response message');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please log in to respond to requests');
        navigate('/login/shelter');
        return;
      }

      await axios.put(
        `http://localhost:8080/api/adoption-requests/${selectedRequest.id}/status`,
        {
          status: response.toLowerCase().includes('approved') ? 'APPROVED' : 'REJECTED',
          response: response.trim(),
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setSuccess('Response submitted successfully');
      handleCloseDialog();
      fetchRequests();
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Please log in to respond to requests');
        navigate('/login/shelter');
      } else {
        setError('Failed to submit response. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Manage Adoption Requests
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Pet Name</TableCell>
                <TableCell>Adopter Name</TableCell>
                <TableCell>Message</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No adoption requests found
                  </TableCell>
                </TableRow>
              ) : (
                requests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>{request.pet.name}</TableCell>
                    <TableCell>{request.adopter.name}</TableCell>
                    <TableCell>{request.message}</TableCell>
                    <TableCell>
                      <Chip
                        label={request.status}
                        color={getStatusColor(request.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {new Date(request.requestDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {request.status === 'PENDING' && (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleOpenDialog(request)}
                          disabled={loading}
                        >
                          Respond
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Respond to Adoption Request</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Pet: {selectedRequest?.pet.name}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Adopter: {selectedRequest?.adopter.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Request Message: {selectedRequest?.message}
              </Typography>
              <TextField
                autoFocus
                margin="dense"
                label="Response"
                fullWidth
                multiline
                rows={4}
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                helperText="Include 'approved' or 'rejected' in your response to set the status"
                error={!!error}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button
              onClick={handleSubmitResponse}
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Submit Response'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default ManageAdoptionRequests; 