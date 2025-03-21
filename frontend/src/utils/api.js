import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  },
};

// Pets API
export const petsAPI = {
  getAll: () => api.get('/pets'),
  getById: (id) => api.get(`/pets/${id}`),
  create: (petData) => api.post('/pets', petData),
  update: (id, petData) => api.put(`/pets/${id}`, petData),
  delete: (id) => api.delete(`/pets/${id}`),
};

// Shelters API
export const sheltersAPI = {
  getAll: () => api.get('/shelters'),
  getById: (id) => api.get(`/shelters/${id}`),
  create: (shelterData) => api.post('/shelters', shelterData),
  update: (id, shelterData) => api.put(`/shelters/${id}`, shelterData),
  delete: (id) => api.delete(`/shelters/${id}`),
};

// Adoption Requests API
export const adoptionRequestsAPI = {
  getAll: () => api.get('/adoption-requests'),
  getById: (id) => api.get(`/adoption-requests/${id}`),
  create: (requestData) => api.post('/adoption-requests', requestData),
  update: (id, requestData) => api.put(`/adoption-requests/${id}`, requestData),
  delete: (id) => api.delete(`/adoption-requests/${id}`),
};

// Helper function to check if user is authenticated
export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

export default api; 