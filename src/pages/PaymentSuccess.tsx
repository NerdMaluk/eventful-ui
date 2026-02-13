// pages/PaymentSuccess.tsx
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const reference = searchParams.get('reference'); // O Paystack envia isso na URL

  return (
    <div className="payment-success-page" style={{ textAlign: 'center', padding: '50px' }}>
      <div className="success-card">
        <h1>Payment Received! ✅</h1>
        <p>Thank you. Your transaction reference is: <strong>{reference}</strong></p>
        <p>We are processing your ticket. It will appear in your wallet shortly.</p>
        <button className="btn-primary" onClick={() => navigate('/tickets')}>
          Go to My Tickets
        </button>
      </div>
    </div>
  );
}