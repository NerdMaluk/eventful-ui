import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateEvent from './pages/CreateEvent';
import {ProtectedRoute} from './components/ProtectedRoute';
import Events from './pages/Events';
import MyTickets from './pages/MyTickets';
import ScanTicket from './pages/ScanTicket';
import Analytics from './pages/Analytics';
import CheckInHistory from './pages/CheckInHistory';
import PaymentSuccess from './pages/PaymentSuccess';

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Events />} />
        <Route path="/events" element={<Events />} />
        <Route path="/tickets" element={<MyTickets />} />
        <Route path="/scan" element={<ScanTicket />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/history" element={<CheckInHistory />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        

        <Route
          path="/events/create"
          element={
            <ProtectedRoute role="CREATOR">
              <CreateEvent />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;

