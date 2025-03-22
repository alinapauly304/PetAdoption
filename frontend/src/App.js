import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Pets from './pages/Pets';
import PetDetails from './pages/PetDetails';
import Shelters from './pages/Shelters';
import ShelterProfile from './pages/ShelterProfile';
import ManagePets from './pages/ManagePets';
import ManageAdoptionRequests from './pages/ManageAdoptionRequests';
import MyAdoptionRequests from './pages/MyAdoptionRequests';
import AddPet from './pages/AddPet';
import RegisterChoice from './pages/RegisterChoice';
import Landing from './pages/Landing';
import ShelterDashboard from './pages/ShelterDashboard';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login/:userType" element={<Login />} />
        <Route path="/register/:userType" element={<Register />} />
        <Route path="/register-choice" element={<RegisterChoice />} />
        <Route path="/pets" element={<Pets />} />
        <Route path="/pets/:id" element={<PetDetails />} />
        <Route path="/shelters" element={<Shelters />} />
        <Route path="/shelter/dashboard" element={<ShelterDashboard />} />
        <Route path="/shelter/profile" element={<ShelterProfile />} />
        <Route path="/shelter/pets" element={<ManagePets />} />
        <Route path="/shelter/requests" element={<ManageAdoptionRequests />} />
        <Route path="/shelter/pets/add" element={<AddPet />} />
        <Route path="/my-requests" element={<MyAdoptionRequests />} />
      </Routes>
    </Router>
  );
}

export default App; 