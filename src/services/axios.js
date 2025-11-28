import axios from 'axios';

import { store } from 'src/store';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// Create axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    console.log('Log ==> error', response);
    if (response) {
      // Handle specific error codes
      switch (response.status) {
        case 401:
          // Unauthorized - clear auth and redirect to login
          // store.dispatch(logout());
          // window.location.href = '/auth/login';
          break;
        case 403:
          // Forbidden
          console.error('Access forbidden:', response.data);
          break;
        case 404:
          // Not found
          console.error('Resource not found:', response.data);
          break;
        case 500:
          // Server error
          console.error('Server error:', response.data);
          break;
        default:
          console.error('API error:', response.data);
      }
    } else if (error.request) {
      // Network error
      console.error('Network error:', error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
