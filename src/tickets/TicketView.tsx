import * as QRCode from 'qrcode.react';

interface Ticket {
  qrCode: string;
}

export default function TicketView({ ticket }: { ticket: Ticket }) {
  return (
    <div>
      <h2>Your Ticket</h2>
      < QRCode.QRCodeCanvas value={ticket.qrCode} />
    </div>
  );
}
