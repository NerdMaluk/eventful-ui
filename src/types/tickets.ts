import type { Event } from './event';

export interface Ticket {
  id: string;
  qrCode: string;
  createdAt: string;
  event: Event;
  scannedAt?: string;
  price: number;
  checkedIn: boolean;
  status: 'PENDING' | 'ACTIVE' | 'USED' | 'CANCELLED' 
}
