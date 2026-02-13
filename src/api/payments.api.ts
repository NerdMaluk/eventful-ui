import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const initializePayment = (  eventId: string) =>
  api.post('/payments/initialize', { eventId });

export const verifyPayment = (reference: string) =>
  api.get(`/payments/verify?reference=${reference}`);

export const getPaymentStatus = (reference: string) =>
  api.get(`/payments/status?reference=${reference}`);