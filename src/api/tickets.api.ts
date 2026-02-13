import type { Ticket } from '../types/tickets';
import { api } from './axios';

export const getMyTickets = async () => {
  const res = await api.get('/tickets/me');
  return res.data;
};

export const scanTicket = async (qrData: string) => {
  const res = await api.post('/tickets/scan', { qrData });
  return res.data;
};
// tickets.api.ts

export const getExistingTicket = async (eventId: string): Promise<Ticket | null> => {
  try {
    // Se o seu backend espera o eventId como Query param no GET
    const response = await api.get('/tickets/me', { params: { eventId } });
    return response.data;
  } catch (error) {
    console.error('Failed to get existing ticket:', error);
    return null;
  }
};

export const buyTicket = async (eventId: string) => {
  // CORREÇÃO AQUI: 
  // O segundo argumento do api.post é o BODY (objeto JSON).
  // Não passamos o eventId na URL com '?', mas sim dentro de um objeto {}.
  const res = await api.post('/tickets/buy', { eventId }); 
  return res.data;
};// buyTicket
