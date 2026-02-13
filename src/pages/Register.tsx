import { useState } from 'react';
import { register as registerApi } from '../api/auth.api';
import { useAuth } from '../context/useAuth';
import { useNavigate } from 'react-router-dom';
import './Register.css';

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'CREATOR' | 'EVENTEE'>('EVENTEE');
  const [error, setError] = useState('');

  const submit = async () => {
    try {
      const res = await registerApi({ name, email, password, role });
      console.log('Register response:', res);

      if (!res.access_token) {
        setError('Invalid response from API');
        return;
      }

      login(res.access_token, res.user || {});
      navigate('/events'); // redireciona após registro
    } catch (err: any) {
      console.error('Register error full:', err);
      setError(err?.response?.data?.message || err.message || 'Register failed');
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Register</h2>
        {error && <p className="error">{error}</p>}

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <select value={role} onChange={e => setRole(e.target.value as 'CREATOR' | 'EVENTEE')}>
          <option value="EVENTEE">Eventee</option>
          <option value="CREATOR">Creator</option>
        </select>

        <button onClick={submit}>Register</button>
      </div>
    </div>
  );
}

