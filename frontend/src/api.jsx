import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001', // Cambia el puerto si es necesario
  withCredentials: true, // Necesario para las cookies de sesión
});

export default api;
