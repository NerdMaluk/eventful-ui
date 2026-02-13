import '../pages/Analytics.css';

interface Props {
  label: string;
  value: string | number;
  color: 'blue' | 'green' | 'yellow' | 'purple';
  icon: string; // O ícone que você está passando no Analytics.tsx
}

// Adicionei o "icon" aqui nos parênteses
export default function StatCard({ label, value, color, icon }: Props) {
  return (
    <div className={`stat-card ${color}`}>
      <div className="stat-icon-container">
        {icon}
      </div>
      <div className="stat-content">
        <p className="stat-label">{label}</p>
        <h3 className="stat-value">{value}</h3>
      </div>
    </div>
  );
}
