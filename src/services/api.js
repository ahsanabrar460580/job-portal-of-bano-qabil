import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

// Auth endpoints
export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
};

// Jobs endpoints
export const jobsAPI = {
  getAll: () => api.get('/jobs'),
  getById: (id) => api.get(`/jobs/${id}`),
  create: (jobData) => api.post('/jobs', jobData),
  update: (id, jobData) => api.put(`/jobs/${id}`, jobData),
  delete: (id) => api.delete(`/jobs/${id}`),
};

// Internships endpoints
export const internshipsAPI = {
  getAll: () => api.get('/internships'),
  getById: (id) => api.get(`/internships/${id}`),
  apply: (id) => api.post(`/internships/${id}/apply`),
};

// Companies endpoints
export const companiesAPI = {
  getAll: () => api.get('/companies'),
  getById: (id) => api.get(`/companies/${id}`),
};

// User endpoints
export const usersAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (userData) => api.put('/users/profile', userData),
  uploadCV: (formData) => api.post('/users/cv', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
};

export default api;