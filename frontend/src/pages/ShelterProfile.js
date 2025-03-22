import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  TextField,
  Alert,
  CircularProgress,
  Divider,
} from '@mui/material';
import axios from 'axios';

const ShelterProfile = () => {
  const navigate = useNavigate();
  const [shelter, setShelter] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    description: '',
  });

  useEffect(() => {
    const fetchShelterProfile = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        const userType = localStorage.getItem('userType');
        
        if (!userId || !token || userType !== 'shelter') {
          navigate('/login/shelter');
          return;
        }

        const response = await axios.get(`http://localhost:8082/api/shelters/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.data) {
          setShelter(response.data);
          setFormData({
            name: response.data.name || '',
            email: response.data.email || '',
            phone: response.data.phone || '',
            location: response.data.location || '',
            description: response.data.description || '',
          });
        } else {
          setError('Failed to fetch shelter profile');
        }
      } catch (err) {
        if (err.response?.status === 401) {
          navigate('/login/shelter');
        } else {
          setError(err.response?.data?.message || 'Failed to fetch shelter profile');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchShelterProfile();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!formData.phone.match(/^\d{10}$/)) {
      setError('Please enter a valid 10-digit phone number');
      return false;
    }
    if (!formData.name.trim()) {
      setError('Shelter name is required');
      return false;
    }
    if (!formData.location.trim()) {
      setError('Location is required');
      return false;
    }
    if (!formData.description.trim()) {
      setError('Description is required');
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

    setUpdating(true);

    try {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');

      if (!userId || !token) {
        navigate('/login/shelter');
        return;
      }

      const requestData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone,
        location: formData.location.trim(),
        description: formData.description.trim(),
      };

      const response = await axios.put(
        `http://localhost:8082/api/shelters/${userId}`,
        requestData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.data) {
        setSuccess('Profile updated successfully');
        setShelter(response.data);
      } else {
        setError('Failed to update profile');
      }
    } catch (err) {
      if (err.response?.status === 401) {
        navigate('/login/shelter');
      } else {
        setError(err.response?.data?.message || 'Failed to update profile');
      }
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!shelter) {
    return (
      <Container>
        <Alert severity="error">Failed to load shelter profile</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Shelter Profile
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        
        <Paper sx={{ p: 3 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Shelter Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  helperText="Enter your shelter's name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  helperText="Enter a valid email address"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  helperText="Enter 10-digit phone number"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  helperText="Enter your shelter's address"
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
                  required
                  helperText="Describe your shelter and its mission"
                />
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  disabled={updating}
                >
                  {updating ? 'Updating...' : 'Update Profile'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default ShelterProfile; 