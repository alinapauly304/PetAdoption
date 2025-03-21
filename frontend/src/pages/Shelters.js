import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  TextField,
  Chip,
} from '@mui/material';
import axios from 'axios';

function Shelters() {
  const [shelters, setShelters] = useState([]);
  const [filteredShelters, setFilteredShelters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchShelters = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/shelters');
        setShelters(response.data);
        setFilteredShelters(response.data);
      } catch (error) {
        console.error('Error fetching shelters:', error);
      }
    };

    fetchShelters();
  }, []);

  useEffect(() => {
    const filtered = shelters.filter(shelter =>
      shelter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shelter.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredShelters(filtered);
  }, [searchTerm, shelters]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Animal Shelters
      </Typography>

      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search shelters by name or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>

      <Grid container spacing={4}>
        {filteredShelters.map((shelter) => (
          <Grid item key={shelter.id} xs={12} md={6} lg={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h2" gutterBottom>
                  {shelter.name}
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                  {shelter.location}
                </Typography>
                <Typography variant="body2" paragraph>
                  {shelter.description}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Contact: {shelter.contactInfo}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip label={`${shelter.pets?.length || 0} Pets Available`} color="primary" />
                  <Chip label="Open for Adoptions" color="success" />
                </Box>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  View Pets
                </Button>
                <Button size="small" color="primary">
                  Contact Shelter
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredShelters.length === 0 && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No shelters found matching your search criteria.
          </Typography>
        </Box>
      )}
    </Container>
  );
}

export default Shelters; 