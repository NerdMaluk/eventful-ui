import type { Event } from '../types/event';
import { useAuth } from '../context/useAuth';
import './EventCard.css';
import { buyTicket } from '../api/tickets.api';
import { useState } from 'react'; // Importamos o useState para feedback de loading
import { useNavigate } from 'react-router-dom';

interface Props {
  event: Event;
}

export default function EventCard({ event }: Props) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Adicionamos estado de loading

  const isSoldOut = event.capacity <= 0;
  const isFree = event.price === 0;

  const handleJoin = async () => {
  if (isSoldOut || loading) return;

  setLoading(true);
  try {
    const response = await buyTicket(event.id);

    // Se o backend retornar um link de pagamento (Evento Pago)
    if (response.isPaid && response.paymentUrl) {
      // Redireciona o navegador para o Checkout do Paystack
      window.location.href = response.paymentUrl; 
      return; 
    }

    // Se for evento grátis (Retorno direto do Ticket)
    if (response.id) {
      alert('Ticket reserved successfully! 🎉');
      navigate('/tickets');
    }

  } catch (error: any) {
    alert(error.response?.data?.message || 'Error processing request');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className={`event-card ${isSoldOut ? 'sold-out' : ''}`}>
      <div className="event-card-header">
        <span className="event-date">{new Date(event.date).toLocaleDateString()}</span>
        <h3>{event.title}</h3>
      </div>

      <div className="event-card-body">
        <p className="description">{event.description}</p>
        
        <div className="event-details">
          <div className="detail-item">
            <span className="icon">📍</span> 
            <span>{event.location}</span>
          </div>
          <div className="detail-item">
            <span className="icon">👥</span> 
            <span className={isSoldOut ? 'text-danger' : ''}>
              {isSoldOut ? 'Sold Out' : `${event.capacity} seats available`}
            </span>
          </div>
        </div>
      </div>

      <div className="event-card-footer">
        <div className="price-tag">
            <small>Price</small>
            <p className={isFree ? 'free-text' : ''}>
            {isFree ? 'FREE' : `$${event.price.toLocaleString()} USD`}
            </p>
        </div>

        {user?.role === 'EVENTEE' && (
          <button 
            className={`btn-primary ${isSoldOut || loading ? 'btn-disabled' : ''}`} 
            onClick={handleJoin}
            disabled={isSoldOut || loading}
          >
            {loading 
              ? 'Processing...' 
              : isSoldOut 
                ? 'Sold Out' 
                : (isFree ? 'Get Free Ticket' : 'Buy Ticket')
            }
          </button>
        )}
      </div>
    </div>
  );
}



