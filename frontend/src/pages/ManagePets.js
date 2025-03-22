import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  CircularProgress,
  IconButton,
  Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

function ManagePets() {
  const navigate = useNavigate();
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const petTypes = ['Dog', 'Cat', 'Bird', 'Rabbit', 'Other'];
  const genderOptions = ['Male', 'Female'];

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      
      if (!token || !userId) {
        setError('Please log in to view pets');
        navigate('/login/shelter');
        return;
      }

      const response = await axios.get(`http://localhost:8080/api/pets/shelter/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (!response.data || response.data.length === 0) {
        setPets([]);
      } else {
        setPets(response.data);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        setError('Please log in to view pets');
        navigate('/login/shelter');
      } else {
        setError('Failed to fetch pets. Please try again.');
      }
    } finally {
      setFetching(false);
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
    setSuccess('');
  };

  const handleChange = (e) => {
    setSelectedPet({
      ...selectedPet,
      [e.target.name]: e.target.value,
    });
  };

  const validatePet = (pet) => {
    if (!pet.name.trim()) {
      setError('Pet name is required');
      return false;
    }
    if (!pet.type) {
      setError('Pet type is required');
      return false;
    }
    if (!pet.breed.trim()) {
      setError('Breed is required');
      return false;
    }
    if (!pet.age || pet.age < 0) {
      setError('Please enter a valid age');
      return false;
    }
    if (!pet.gender) {
      setError('Gender is required');
      return false;
    }
    if (!pet.imageUrl.trim()) {
      setError('Image URL is required');
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validatePet(selectedPet)) {
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please log in to update pets');
        navigate('/login/shelter');
        return;
      }

      await axios.put(
        `http://localhost:8080/api/pets/${selectedPet.petId}`,
        selectedPet,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSuccess('Pet updated successfully!');
      await fetchPets();
      handleClose();
    } catch (error) {
      if (error.response?.status === 401) {
        setError('Please log in to update pets');
        navigate('/login/shelter');
      } else {
        setError(error.response?.data?.message || 'Failed to update pet. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (petId) => {
    if (window.confirm('Are you sure you want to delete this pet?')) {
      setLoading(true);
      setError('');
      setSuccess('');

      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Please log in to delete pets');
          navigate('/login/shelter');
          return;
        }

        await axios.delete(`http://localhost:8080/api/pets/${petId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSuccess('Pet deleted successfully!');
        await fetchPets();
      } catch (error) {
        if (error.response?.status === 401) {
          setError('Please log in to delete pets');
          navigate('/login/shelter');
        } else {
          setError('Failed to delete pet. Please try again.');
        }
      } finally {
        setLoading(false);
      }
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
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Manage Pets
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate('/shelter/pets/add')}
        >
          Add New Pet
        </Button>
      </Box>

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

      <Grid container spacing={3}>
        {pets.map((pet) => (
          <Grid item xs={12} sm={6} md={4} key={pet.petId}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={pet.imageUrl}
                alt={pet.name}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {pet.name}
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                  {pet.breed} {pet.type}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Age: {pet.age} years
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Gender: {pet.gender}
                </Typography>
              </CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
                <Tooltip title="Edit">
                  <IconButton onClick={() => handleEdit(pet)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton onClick={() => handleDelete(pet.petId)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Edit Pet</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Pet Name"
            type="text"
            fullWidth
            value={selectedPet?.name || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="type"
            label="Pet Type"
            select
            fullWidth
            value={selectedPet?.type || ''}
            onChange={handleChange}
          >
            {petTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="dense"
            name="breed"
            label="Breed"
            type="text"
            fullWidth
            value={selectedPet?.breed || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="age"
            label="Age"
            type="number"
            fullWidth
            value={selectedPet?.age || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="gender"
            label="Gender"
            select
            fullWidth
            value={selectedPet?.gender || ''}
            onChange={handleChange}
          >
            {genderOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="dense"
            name="imageUrl"
            label="Image URL"
            type="text"
            fullWidth
            value={selectedPet?.imageUrl || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={selectedPet?.description || ''}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default ManagePets; 