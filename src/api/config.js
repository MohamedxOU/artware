import axios from 'axios';
// API configuration
export const API_URL = process.env.API_URL ;

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;