import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7124/api', // backend API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
