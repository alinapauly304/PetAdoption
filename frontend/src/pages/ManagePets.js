import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Alert,
} from '@mui/material';
import axios from 'axios';

function ManagePets() {
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const petTypes = ['Dog', 'Cat', 'Bird', 'Rabbit', 'Other'];
  const genderOptions = ['Male', 'Female'];

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8081/api/pets/shelter', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPets(response.data);
    } catch (error) {
      console.error('Error fetching pets:', error);
    }
  };

  const handleEdit = (pet) => {
    setSelectedPet(pet);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setSelectedPet(null);
    setOpenDialog(false);
    setError('');
  };

  const handleChange = (e) => {
    setSelectedPet({
      ...selectedPet,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:8081/api/pets/${selectedPet.petId}`, selectedPet, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPets();
      handleClose();
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred while updating the pet');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (petId) => {
    if (!window.confirm('Are you sure you want to delete this pet?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8081/api/pets/${petId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPets();
    } catch (error) {
      console.error('Error deleting pet:', error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Manage Pets
      </Typography>

      <Grid container spacing={4}>
        {pets.map((pet) => (
          <Grid item key={pet.petId} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={pet.imageUrl}
                alt={pet.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {pet.name}
                </Typography>
                <Typography>
                  {pet.breed} • {pet.age} years old
                </Typography>
                <Typography color="text.secondary">
                  {pet.type}
                </Typography>
                <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEdit(pet)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(pet.petId)}
                  >
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Pet</DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {selectedPet && (
            <Box sx={{ pt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Pet Name"
                    name="name"
                    value={selectedPet.name}
                    onChange={handleChange}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    select
                    label="Pet Type"
                    name="type"
                    value={selectedPet.type}
                    onChange={handleChange}
                    required
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
                    fullWidth
                    label="Breed"
                    name="breed"
                    value={selectedPet.breed}
                    onChange={handleChange}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Age"
                    name="age"
                    type="number"
                    value={selectedPet.age}
                    onChange={handleChange}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    select
                    label="Gender"
                    name="gender"
                    value={selectedPet.gender}
                    onChange={handleChange}
                    required
                  >
                    {genderOptions.map((gender) => (
                      <MenuItem key={gender} value={gender}>
                        {gender}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={selectedPet.description}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Image URL"
                    name="imageUrl"
                    value={selectedPet.imageUrl}
                    onChange={handleChange}
                    required
                  />
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default ManagePets; 