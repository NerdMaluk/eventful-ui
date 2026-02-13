import { useEffect, useState } from 'react';
import {api} from '../api/axios'; 
import './CheckInHistory.css';

interface CheckIn {
  id: string;
  scannedAt: string;
  event: { title: string };
  attendee: { name: string; email: string };
}

export default function CheckInHistory() {
  const [history, setHistory] = useState<CheckIn[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/tickets/history')
      .then(res => setHistory(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading-state">Loading history...</div>;

  return (
    <div className="history-page">
      <header className="history-header">
        <h1>Attendance History</h1>
        <p>Track real-time check-ins for your events</p>
      </header>

      <div className="table-container">
        <div className="table-wrapper">
          <table className="dark-table">
            <thead>
              <tr>
                <th>ATTENDEE</th>
                <th>EVENT</th>
                <th>TIME</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {history.length > 0 ? (
                history.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="user-info">
                        <span className="user-name">{item.attendee.name}</span>
                        <span className="user-email">{item.attendee.email}</span>
                      </div>
                    </td>
                    <td className="event-title-cell">{item.event.title}</td>
                    <td className="time-cell">
                      {new Date(item.scannedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td>
                      <span className="badge-success">VERIFIED</span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="empty-msg">No check-ins recorded yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}