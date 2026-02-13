import { useEffect, useState } from 'react';
import { getMyTickets } from '../api/tickets.api';
import TicketCard from '../components/TicketCard';
import type { Ticket } from '../types/tickets';
import './MyTickets.css';

export default function MyTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyTickets()
      .then(setTickets)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading-state">Loading your wallet...</div>;

  return (
    <div className="my-tickets-container">
      <header className="tickets-header">
        <h1>My Tickets</h1>
        <p>You have {tickets.length} tickets in your wallet</p>
      </header>
      
      <div className="tickets-grid">
        {tickets.length === 0 ? (
          <div className="empty-state">
            <p>You haven't joined any events yet.</p>
            <button className="btn-primary" onClick={() => window.location.href='/events'}>
              Explore Events
            </button>
          </div>
        ) : (
          tickets.map(ticket => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))
        )}
      </div>
    </div>
  );
}
