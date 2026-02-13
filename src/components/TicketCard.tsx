import { QRCodeSVG } from 'qrcode.react'; // Importa a versão SVG (mais leve)
import type { Ticket } from '../types/tickets';
import './TicketCard.css';

type Props = {
  ticket: Ticket;
};

export default function TicketCard({ ticket }: Props) {
  const isUsed = !!ticket.scannedAt;

  return (
    <div className={`ticket-item ${isUsed ? 'ticket-used' : ''}`}>
      <div className="ticket-left">
        <div className="ticket-event-info">
          <span className="ticket-label">Event</span>
          <h3>{ticket.event.title}</h3>
        </div>
        
        <div className="ticket-meta">
          <div>
            <span className="ticket-label">Date</span>
            <p>{new Date(ticket.event.date).toLocaleDateString()}</p>
          </div>
          <div>
            <span className="ticket-label">Location</span>
            <p>{ticket.event.location}</p>
          </div>
        </div>
      </div>

      <div className="ticket-right">
        <div className="qr-container">
          {/* O valor do QR Code é o ID do ticket para o scanner ler no backend */}
          <QRCodeSVG 
            value={ticket.id} 
            size={80}
            level={"H"} // Alta tolerância a erros
            includeMargin={true}
          />
          <span className="ticket-id-small">{ticket.id.substring(0, 8)}</span>
          <span className="ticket-status">{isUsed ? 'CHECKED-IN' : 'ACTIVE'}</span>
        </div>
      </div>
      
      <div className="ticket-cutout"></div>
    </div>
  );
}