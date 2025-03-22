import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Alert,
  Grid,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';

function AddPet() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    breed: '',
    age: '',
    gender: '',
    imageUrl: '',
    description: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [uploadLoading, setUploadLoading] = useState(false);

  const petTypes = ['Dog', 'Cat', 'Bird', 'Rabbit', 'Other'];
  const genderOptions = ['Male', 'Female'];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('http://localhost:8080/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setFormData(prev => ({
        ...prev,
        imageUrl: response.data.url
      }));
    } catch (error) {
      setError('Failed to upload image. Please try again.');
    } finally {
      setUploadLoading(false);
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Pet name is required');
      return false;
    }
    if (!formData.type) {
      setError('Pet type is required');
      return false;
    }
    if (!formData.breed.trim()) {
      setError('Breed is required');
      return false;
    }
    if (!formData.age || formData.age < 0) {
      setError('Please enter a valid age');
      return false;
    }
    if (!formData.gender) {
      setError('Gender is required');
      return false;
    }
    if (!formData.imageUrl.trim()) {
      setError('Image URL is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      
      if (!token || !userId) {
        setError('Please log in to add a pet');
        navigate('/login/shelter');
        return;
      }

      // Convert age to number and ensure all required fields are present
      const petData = {
        name: formData.name.trim(),
        type: formData.type,
        breed: formData.breed.trim(),
        age: parseInt(formData.age),
        gender: formData.gender,
        imageUrl: formData.imageUrl.trim(),
        description: formData.description?.trim() || '',
        shelterId: parseInt(userId)
      };

      const response = await axios.post('http://localhost:8080/api/pets', petData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data) {
        setSuccess('Pet added successfully!');
        setTimeout(() => {
          navigate('/shelter/pets');
        }, 1500);
      }
    } catch (error) {
      console.error('Error adding pet:', error);
      
      if (error.response?.status === 401) {
        setError('Please log in to add a pet');
        navigate('/login/shelter');
      } else if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else if (error.response?.data?.errors) {
        // Handle validation errors
        const errorMessages = Object.values(error.response.data.errors).join(', ');
        setError(errorMessages);
      } else {
        setError('Failed to add pet. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Add New Pet
        </Typography>
        <Paper elevation={3} sx={{ p: 4 }}>
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
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Pet Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  helperText="Enter the pet's name"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  select
                  label="Pet Type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  helperText="Select the type of pet"
                >
                  {petTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Breed"
                  name="breed"
                  value={formData.breed}
                  onChange={handleChange}
                  helperText="Enter the pet's breed"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Age"
                  name="age"
                  type="number"
                  value={formData.age}
                  onChange={handleChange}
                  helperText="Enter the pet's age in years"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  select
                  label="Gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  helperText="Select the pet's gender"
                >
                  {genderOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Image URL"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  helperText="Enter the URL of the pet's image"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  multiline
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  helperText="Enter a description of the pet"
                />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/shelter/pets')}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                  >
                    {loading ? <CircularProgress size={24} /> : 'Add Pet'}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}

export default AddPet; 