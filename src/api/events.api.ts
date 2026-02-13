import { api } from './axios';
import type { Event } from '../types/event';

export const getEvents = async (): Promise<Event[]> => {
  const res = await api.get('/events');
  return res.data;
};

export const createEvent = async (data: {
  title: string;
  description: string;
  location: string;
  capacity: number;
  price: number;
  date: string;
}) => {
  const res = await api.post('/events', data);
  return res.data;
};
export const joinEvent = async (eventId: string) => {
  const res = await api.post(`/events/${eventId}/join`);
  return res.data;
};

