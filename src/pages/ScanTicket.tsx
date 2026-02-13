import { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { scanTicket } from '../api/tickets.api';
import './ScanTicket.css';

export default function ScanTicket() {
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);
  const [isScanning, setIsScanning] = useState(true);

  useEffect(() => {
    // Configura o scanner
    const scanner = new Html5QrcodeScanner(
      "reader", 
      { fps: 10, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false
    );

    scanner.render(onScanSuccess, onScanError);

    async function onScanSuccess(decodedText: string) {
    
      try {
        
        const res = await scanTicket(decodedText); 
        setResult({ success: true, message: `Check-in Successful: ${res.attendee?.name || 'Ticket Valid'}` });
        scanner.clear(); // Para a câmera após sucesso
        setIsScanning(false);
      } catch (err: any) {
        setResult({ success: false, message: err.response?.data?.message || 'Invalid Ticket' });
      }
    }

    function onScanError(err: any) {
      console.error(err);
      
    }

    return () => {
      scanner.clear();
    };
  }, []);

  const resetScanner = () => {
    setResult(null);
    setIsScanning(true);
    window.location.reload(); // Forma mais simples de reiniciar a câmera
  };

  return (
    <div className="scan-page">
      <div className="scan-card">
        <header className="scan-header">
          <h1>Ticket Scanner</h1>
          <p>Point the camera at the attendee's QR Code</p>
        </header>

        {isScanning && <div id="reader" className="scanner-view"></div>}

        {result && (
          <div className={`scan-feedback ${result.success ? 'success' : 'error'}`}>
            <div className="status-icon">{result.success ? '✅' : '❌'}</div>
            <h2>{result.success ? 'Access Granted' : 'Access Denied'}</h2>
            <p>{result.message}</p>
            <button className="btn-primary" onClick={resetScanner}>Scan Next Ticket</button>
          </div>
        )}
      </div>
    </div>
  );
}