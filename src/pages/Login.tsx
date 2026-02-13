import { useState } from 'react';
import { login as loginApi } from '../api/auth.api';
import { useAuth } from '../context/useAuth';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = async () => {
    try {
      const res = await loginApi(email, password);
      console.log('Login response:', res);

      if (!res.access_token) {
        setError('Invalid response from API');
        return;
      }

      login(res.access_token, res.user || {});
      navigate('/events'); // redirect after login
    } catch (err: any) {
      console.error('Login error full:', err);
      setError(err?.response?.data?.message || err.message || 'Login failed');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}

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

        <button onClick={submit}>Login</button>
      </div>
    </div>
  );
}

