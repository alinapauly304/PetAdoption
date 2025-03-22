import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  keyframes,
} from '@mui/material';

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

function Navbar() {
  const navigate = useNavigate();
  const userType = localStorage.getItem('userType');
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <AppBar position="static" elevation={0}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            animation: `${bounce} 2s ease-in-out infinite`,
            cursor: 'pointer',
          }}
          onClick={() => navigate('/')}
        >
          PetConnect
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {!isAuthenticated ? (
            <>
              <Button
                color="inherit"
                onClick={() => navigate('/register-choice')}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                Register
              </Button>
              <Button
                color="inherit"
                onClick={() => navigate('/register-choice')}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                Login
              </Button>
            </>
          ) : (
            <>
              {userType === 'SHELTER' && (
                <>
                  <Button
                    color="inherit"
                    onClick={() => navigate('/shelter/dashboard')}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  >
                    Dashboard
                  </Button>
                  <Button
                    color="inherit"
                    onClick={() => navigate('/shelter/pets')}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  >
                    Manage Pets
                  </Button>
                  <Button
                    color="inherit"
                    onClick={() => navigate('/shelter/requests')}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  >
                    Requests
                  </Button>
                </>
              )}
              {userType === 'ADOPTER' && (
                <>
                  <Button
                    color="inherit"
                    onClick={() => navigate('/home')}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  >
                    Home
                  </Button>
                  <Button
                    color="inherit"
                    onClick={() => navigate('/pets')}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  >
                    Browse Pets
                  </Button>
                  <Button
                    color="inherit"
                    onClick={() => navigate('/my-requests')}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  >
                    My Requests
                  </Button>
                </>
              )}
              <Button
                color="inherit"
                onClick={() => {
                  localStorage.removeItem('token');
                  localStorage.removeItem('userType');
                  localStorage.removeItem('userId');
                  navigate('/');
                }}
                sx={{
                  animation: `${pulse} 2s ease-in-out infinite`,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                Logout
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar; 