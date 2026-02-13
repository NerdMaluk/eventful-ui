import { Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { NotificationBell } from './NotificationBell';
import './Navbar.css';

export const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h4>Morabeza Events</h4>
        </Link>
      </div>

      <div className="nav-right">
        <Link to="/events" className="btn-primary">Events</Link>

        {user?.role === 'EVENTEE' && (
          <Link to="/tickets" className="btn-primary">My Tickets</Link>
        )}

        {user?.role === 'CREATOR' && (
          <>
            <Link to="/history" className="btn-primary">Check-in History</Link>
            <Link to="/events/create" className="btn-primary">Create Event</Link>
            <Link to="/scan" className="btn-primary">Scan Tickets</Link>
            <Link to="/analytics" className="btn-primary">Analytics</Link>
          </>
        )}

        {!user ? (
          <>
            <Link to="/login" className="btn-primary">Login</Link>
            <Link to="/register" className="btn-primary">Register</Link>
          </>
        ) : (
          <div className="user-profile">
           
            <NotificationBell /> 
            
            <div className="user-info">
              <span className="user-name">{user.name} ({user.role})</span>
            </div>
            <button className="btn-logout" onClick={logout}>Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
};;

