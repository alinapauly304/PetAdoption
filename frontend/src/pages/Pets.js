import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  MenuItem,
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import axios from 'axios';

function Pets() {
  const navigate = useNavigate();
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [breedFilter, setBreedFilter] = useState('');
  const [types, setTypes] = useState([]);
  const [breeds, setBreeds] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/pets');
        setPets(response.data);
        setFilteredPets(response.data);
        
        // Extract unique types and breeds
        const uniqueTypes = [...new Set(response.data.map(pet => pet.type))];
        const uniqueBreeds = [...new Set(response.data.map(pet => pet.breed))];
        setTypes(uniqueTypes);
        setBreeds(uniqueBreeds);
      } catch (error) {
        console.error('Error fetching pets:', error);
      }
    };

    fetchPets();
  }, []);

  useEffect(() => {
    let filtered = pets;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(pet =>
        pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pet.breed.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply type filter
    if (typeFilter) {
      filtered = filtered.filter(pet => pet.type === typeFilter);
    }

    // Apply breed filter
    if (breedFilter) {
      filtered = filtered.filter(pet => pet.breed === breedFilter);
    }

    setFilteredPets(filtered);
  }, [searchTerm, typeFilter, breedFilter, pets]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Available Pets
      </Typography>

      {/* Filters */}
      <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ minWidth: 200 }}
        />
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Type</InputLabel>
          <Select
            value={typeFilter}
            label="Type"
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <MenuItem value="">All Types</MenuItem>
            {types.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Breed</InputLabel>
          <Select
            value={breedFilter}
            label="Breed"
            onChange={(e) => setBreedFilter(e.target.value)}
          >
            <MenuItem value="">All Breeds</MenuItem>
            {breeds.map((breed) => (
              <MenuItem key={breed} value={breed}>
                {breed}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="outlined"
          onClick={() => {
            setSearchTerm('');
            setTypeFilter('');
            setBreedFilter('');
          }}
        >
          Clear Filters
        </Button>
      </Box>

      {/* Pets Grid */}
      <Grid container spacing={4}>
        {filteredPets.map((pet) => (
          <Grid item key={pet.petId} xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
              }}
              onClick={() => navigate(`/pets/${pet.petId}`)}
            >
              <CardMedia
                component="img"
                height="200"
                image={pet.imageUrl}
                alt={pet.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {pet.name}
                </Typography>
                <Typography>
                  {pet.breed} • {pet.age} years old
                </Typography>
                <Typography color="text.secondary">
                  {pet.type}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {pet.shelter?.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredPets.length === 0 && (
        <Typography variant="h6" align="center" sx={{ mt: 4 }}>
          No pets found matching your criteria
        </Typography>
      )}
    </Container>
  );
}

export default Pets; 