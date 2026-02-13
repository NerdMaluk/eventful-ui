import { useEffect, useState } from 'react';
import StatCard from '../components/StatCard';
import { getAnalytics } from '../api/analytics.api';
import './Analytics.css';

// 1. Ajuste das tipagens conforme o novo Backend
type EventStats = {
  id: string;
  title: string;
  date: string;
  price: number;
  sold: number;      // Mapeado do backend
  revenue: number;   // Mapeado do backend
  progress: number;  // A porcentagem já calculada no backend
};

type AnalyticsResponse = {
  stats: {
    totalEvents: number;
    totalTicketsSold: number;
    totalRevenue: number;
    totalCheckIns: number;
  };
  tableData: EventStats[]; // O array que vem separado no Controller
};

export default function Analytics() {
  const [data, setData] = useState<AnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const response = await getAnalytics();
        setData(response);
      } catch (error) {
        console.error('Failed to load analytics', error);
      } finally {
        setLoading(false);
      }
    }
    fetchAnalytics();
  }, []);

  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(value);

  const formatDate = (dateString: string) => 
    new Date(dateString).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  if (loading) return <div className="loading-state">Loading dashboard...</div>;
  if (!data) return <div className="error-state">No data available.</div>;

  const { stats, tableData } = data;

  return (
    <div className="analytics-page">
      <h1 className="page-title">📊 Analytics Dashboard</h1>

      {/* CARDS */}
      <div className="stats-grid">
        <StatCard
          label="Total Events"
          value={stats.totalEvents}
          color="blue"
          icon="📅"
        />
        <StatCard
          label="Total Tickets Sold"
          value={stats.totalTicketsSold}
          color="green"
          icon="🎟️"
        />
        <StatCard
          label="Total Revenue"
          value={formatCurrency(stats.totalRevenue)}
          color="yellow"
          icon="💰"
        />
        <StatCard
          label="Total Attendees"
          value={stats.totalCheckIns}
          color="purple"
          icon="👥"
        />
      </div>

      {/* TABELA */}
      <div className="table-container">
        <h2 className="section-title">Event Performance</h2>
        
        <div className="table-wrapper">
          <table className="dark-table">
            <thead>
              <tr>
                <th>EVENT NAME</th>
                <th>DATE</th>
                <th>TICKETS SOLD</th>
                <th>REVENUE</th>
                <th>FILL RATE</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((event) => (
                <tr key={event.id}>
                  <td className="fw-bold">{event.title}</td>
                  <td className="text-gray">{formatDate(event.date)}</td>
                  <td>{event.sold}</td>
                  <td className="fw-bold">{formatCurrency(event.revenue)}</td>
                  <td className="fill-cell">
                    <div className="progress-bar-container">
                      <div 
                        className="progress-bar-fill" 
                        style={{ width: `${event.progress}%` }}
                      ></div>
                    </div>
                    <span className="fill-text">{event.progress}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {tableData.length === 0 && (
            <div className="empty-table">No events found.</div>
          )}
        </div>
      </div>
    </div>
  );
}