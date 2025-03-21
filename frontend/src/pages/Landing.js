import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Paper,
} from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import HomeIcon from '@mui/icons-material/Home';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

function Landing() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography variant="h2" component="h1" align="center" gutterBottom>
        Pet Adoption System
      </Typography>
      <Typography variant="h5" align="center" color="text.secondary" paragraph>
        Connect pets with loving homes
      </Typography>

      <Grid container spacing={4} sx={{ mt: 4 }}>
        {/* Customer Login */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              textAlign: 'center',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              '&:hover': { bgcolor: 'action.hover' },
            }}
            onClick={() => navigate('/login/adopter')}
          >
            <PetsIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Customer Login
            </Typography>
            <Typography color="text.secondary">
              Find and adopt your perfect companion
            </Typography>
          </Paper>
        </Grid>

        {/* Shelter Login */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              textAlign: 'center',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              '&:hover': { bgcolor: 'action.hover' },
            }}
            onClick={() => navigate('/login/shelter')}
          >
            <HomeIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Shelter Login
            </Typography>
            <Typography color="text.secondary">
              Manage your shelter and pets
            </Typography>
          </Paper>
        </Grid>

        {/* Register */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              textAlign: 'center',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              '&:hover': { bgcolor: 'action.hover' },
            }}
            onClick={() => navigate('/register')}
          >
            <PersonAddIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Register
            </Typography>
            <Typography color="text.secondary">
              Create a new account
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ mt: 6, textAlign: 'center' }}>
        <Typography variant="body1" color="text.secondary">
          Already have an account? Choose your login type above.
        </Typography>
      </Box>
    </Container>
  );
}

export default Landing; 