import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ListAltIcon from '@mui/icons-material/ListAlt';

function ShelterDashboard() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        Shelter Dashboard
      </Typography>
      <Typography variant="h6" align="center" color="text.secondary" paragraph>
        Manage your shelter's pets and adoption requests
      </Typography>

      <Grid container spacing={4} sx={{ mt: 4 }}>
        {/* Add Pet */}
        <Grid item xs={12} md={4}>
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
            onClick={() => navigate('/shelter/add-pet')}
          >
            <AddIcon sx={{ fontSize: 80, color: 'primary.main', mb: 3 }} />
            <Typography variant="h4" gutterBottom>
              Add Pet
            </Typography>
            <Typography color="text.secondary">
              List a new pet for adoption
            </Typography>
          </Paper>
        </Grid>

        {/* Edit Pet Info */}
        <Grid item xs={12} md={4}>
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
            onClick={() => navigate('/shelter/pets')}
          >
            <EditIcon sx={{ fontSize: 80, color: 'primary.main', mb: 3 }} />
            <Typography variant="h4" gutterBottom>
              Edit Pets
            </Typography>
            <Typography color="text.secondary">
              Update information for existing pets
            </Typography>
          </Paper>
        </Grid>

        {/* Review Requests */}
        <Grid item xs={12} md={4}>
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
            onClick={() => navigate('/shelter/adoption-requests')}
          >
            <ListAltIcon sx={{ fontSize: 80, color: 'primary.main', mb: 3 }} />
            <Typography variant="h4" gutterBottom>
              Requests
            </Typography>
            <Typography color="text.secondary">
              Review and manage adoption requests
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ShelterDashboard; 