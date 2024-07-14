// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

export const fetchSomething = async () => {
  const response = await api.get('/');
  return response.data;
};
