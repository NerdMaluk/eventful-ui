import type { Ticket } from "./tickets";

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  creatorId: string;
  capacity: number;
  tickets: Ticket[];
  price: number;
}
