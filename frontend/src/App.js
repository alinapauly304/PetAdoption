import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Home from './pages/Home';
import Pets from './pages/Pets';
import PetDetails from './pages/PetDetails';
import Shelters from './pages/Shelters';
import AdoptionRequests from './pages/AdoptionRequests';
import Login from './pages/Login';
import RegisterChoice from './pages/RegisterChoice';
import Register from './pages/Register';
import ShelterDashboard from './pages/ShelterDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import AddPet from './pages/AddPet';
import ManagePets from './pages/ManagePets';
import ShelterAdoptionRequests from './pages/ShelterAdoptionRequests';

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/pets" element={<Pets />} />
          <Route path="/pets/:id" element={<PetDetails />} />
          <Route path="/shelters" element={<Shelters />} />
          <Route path="/login/adopter" element={<Login userType="adopter" />} />
          <Route path="/login/shelter" element={<Login userType="shelter" />} />
          <Route path="/register" element={<RegisterChoice />} />
          <Route path="/register/adopter" element={<Register userType="adopter" />} />
          <Route path="/register/shelter" element={<Register userType="shelter" />} />

          {/* Protected routes */}
          <Route
            path="/adoption-requests"
            element={
              <ProtectedRoute>
                <AdoptionRequests />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shelter/dashboard"
            element={
              <ProtectedRoute>
                <ShelterDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shelter/add-pet"
            element={
              <ProtectedRoute>
                <AddPet />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shelter/pets"
            element={
              <ProtectedRoute>
                <ManagePets />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shelter/adoption-requests"
            element={
              <ProtectedRoute>
                <ShelterAdoptionRequests />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App; 