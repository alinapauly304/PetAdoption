import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
} from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import HomeIcon from '@mui/icons-material/Home';

function RegisterChoice() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        Register as
      </Typography>
      <Typography variant="h6" align="center" color="text.secondary" paragraph>
        Choose your account type
      </Typography>

      <Grid container spacing={4} sx={{ mt: 4 }}>
        {/* Customer Registration */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 4,
              textAlign: 'center',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              '&:hover': { bgcolor: 'action.hover' },
            }}
            onClick={() => navigate('/register/adopter')}
          >
            <PetsIcon sx={{ fontSize: 80, color: 'primary.main', mb: 3 }} />
            <Typography variant="h4" gutterBottom>
              Customer
            </Typography>
            <Typography color="text.secondary">
              Create an account to adopt pets and track your adoption requests
            </Typography>
          </Paper>
        </Grid>

        {/* Shelter Registration */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 4,
              textAlign: 'center',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              '&:hover': { bgcolor: 'action.hover' },
            }}
            onClick={() => navigate('/register/shelter')}
          >
            <HomeIcon sx={{ fontSize: 80, color: 'primary.main', mb: 3 }} />
            <Typography variant="h4" gutterBottom>
              Shelter
            </Typography>
            <Typography color="text.secondary">
              Register your shelter to list pets and manage adoption requests
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ mt: 6, textAlign: 'center' }}>
        <Typography variant="body1" color="text.secondary">
          Already have an account?{' '}
          <Box
            component="span"
            sx={{
              color: 'primary.main',
              cursor: 'pointer',
              '&:hover': { textDecoration: 'underline' },
            }}
            onClick={() => navigate('/')}
          >
            Go back to login
          </Box>
        </Typography>
      </Box>
    </Container>
  );
}

export default RegisterChoice; 