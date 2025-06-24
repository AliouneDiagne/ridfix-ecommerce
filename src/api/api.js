import axios from 'axios';
import { toast } from 'react-toastify';

const api = axios.create({
  baseURL: 'http://localhost:3001', // ✅ fissa per JSON Server locale
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          toast.error('Authentication failed. Please log in again.');
          break;
        case 404:
          toast.error('Resource not found.');
          break;
        case 500:
          toast.error('Server error. Please try again later.');
          break;
        default:
          toast.error(`Error: ${error.response.statusText}`);
      }
    } else if (error.request) {
      toast.error('No response from server. Check your network or API server.');
    } else {
      toast.error(`Error: ${error.message}`);
    }
    return Promise.reject(error);
  }
);

export default api;
