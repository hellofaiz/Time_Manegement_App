// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
});

export const fetchSomething = async () => {
  const response = await api.get('/');
  return response.data;
};
