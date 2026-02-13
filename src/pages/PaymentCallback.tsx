import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { verifyPayment } from '../api/payments.api';

export default function PaymentCallback() {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get('reference');

  const [loading, setLoading] = useState(true);
  const [ticket, setTicket] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!reference) {
      setError('Invalid payment reference');
      setLoading(false);
      return;
    }

    verifyPayment(reference)
      .then((res) => {
        setTicket(res.data.ticket);
      })
      .catch((err) => {
        setError(
          err.response?.data?.message ||
            'Payment verification failed',
        );
      })
      .finally(() => setLoading(false));
  }, [reference]);

  if (loading) return <p>Verifying payment...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>🎉 Payment Successful</h2>

      <p>Ticket ID: {ticket.id}</p>

      <img
        src={`data:image/png;base64,${ticket.qrCode}`}
        alt="QR Code"
      />
    </div>
  );
}
