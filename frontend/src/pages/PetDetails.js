import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Box,
  Chip,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
} from '@mui/material';
import axios from 'axios';

function PetDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [adoptionRequest, setAdoptionRequest] = useState({
    message: '',
  });

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/pets/${id}`);
        setPet(response.data);
      } catch (error) {
        console.error('Error fetching pet details:', error);
        setError('Failed to fetch pet details');
      }
    };

    fetchPet();
  }, [id]);

  const handleAdoptClick = () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    
    if (!token || !userId) {
      setError('Please log in to request adoption');
      navigate('/login');
      return;
    }
    
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setAdoptionRequest({ message: '' });
    setError('');
    setSuccess('');
  };

  const handleSubmitRequest = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      
      if (!token || !userId) {
        setError('Please log in to request adoption');
        navigate('/login');
        return;
      }

      const response = await axios.post('http://localhost:8080/api/adoption-requests', {
        petId: id,
        adopterId: parseInt(userId),
        message: adoptionRequest.message,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      setSuccess('Adoption request submitted successfully!');
      handleCloseDialog();
      setTimeout(() => {
        navigate('/my-adoption-requests');
      }, 1500);
    } catch (error) {
      console.error('Error submitting adoption request:', error);
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError('Failed to submit adoption request. Please try again.');
      }
    }
  };

  if (!pet) {
    return (
      <Container>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}
      
      <Grid container spacing={4}>
        {/* Pet Image */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="400"
              image={pet.imageUrl}
              alt={pet.name}
            />
          </Card>
        </Grid>

        {/* Pet Details */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h1" gutterBottom>
            {pet.name}
          </Typography>
          
          <Box sx={{ mb: 2 }}>
            <Chip label={pet.type} color="primary" sx={{ mr: 1 }} />
            <Chip label={pet.breed} color="secondary" sx={{ mr: 1 }} />
            <Chip label={`${pet.age} years old`} />
          </Box>

          <Typography variant="h6" gutterBottom>
            About {pet.name}
          </Typography>
          <Typography paragraph>
            {pet.description || `${pet.name} is a ${pet.age}-year-old ${pet.breed} ${pet.type} looking for a loving home.`}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" gutterBottom>
            Shelter Information
          </Typography>
          <Typography>
            {pet.shelter?.name}
          </Typography>
          <Typography color="text.secondary">
            {pet.shelter?.location}
          </Typography>
          <Typography color="text.secondary">
            Contact: {pet.shelter?.contactInfo}
          </Typography>

          <Box sx={{ mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleAdoptClick}
            >
              Request Adoption
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Adoption Request Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Request to Adopt {pet.name}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Message to Shelter"
            fullWidth
            multiline
            rows={4}
            value={adoptionRequest.message}
            onChange={(e) => setAdoptionRequest({ ...adoptionRequest, message: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmitRequest} variant="contained">
            Submit Request
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default PetDetails; 