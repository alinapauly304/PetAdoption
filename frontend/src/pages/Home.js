import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
} from '@mui/material';
import axios from 'axios';

function Home() {
  const navigate = useNavigate();
  const [featuredPets, setFeaturedPets] = useState([]);

  useEffect(() => {
    const fetchFeaturedPets = async () => {
      try {
        console.log('Fetching featured pets...');
        const response = await axios.get('http://localhost:8082/api/pets');
        console.log('Featured pets response:', response.data);
        setFeaturedPets(response.data.slice(0, 3)); // Show only first 3 pets
      } catch (error) {
        console.error('Error fetching featured pets:', error);
        console.error('Error response:', error.response);
        console.error('Error message:', error.message);
      }
    };

    fetchFeaturedPets();
  }, []);

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          mb: 6,
        }}
      >
        <Container maxWidth="md">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            gutterBottom
            sx={{ fontWeight: 'bold' }}
          >
            Find Your Perfect Companion
          </Typography>
          <Typography
            variant="h5"
            align="center"
            paragraph
            sx={{ mb: 4 }}
          >
            Give a loving home to a pet in need. Browse our selection of adorable pets waiting for adoption.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => navigate('/pets')}
            >
              Browse Pets
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              size="large"
              onClick={() => navigate('/shelters')}
            >
              Find Shelters
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Featured Pets Section */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Typography
          component="h2"
          variant="h4"
          align="center"
          gutterBottom
          sx={{ mb: 4 }}
        >
          Featured Pets
        </Typography>
        <Grid container spacing={4}>
          {featuredPets.map((pet) => (
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
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Home; 