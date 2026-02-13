import { useState, useEffect } from 'react'; // Adicionamos useEffect
import { AuthContext } from './AuthContext';
import type { User } from '../types/user';
import { api } from '../api/axios'; // Importe sua instância do axios

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
const login = (token: string, user: User) => {
  localStorage.setItem('token', token);
  setUser(user);
};
const logout = () => {
  localStorage.removeItem('token');
  setUser(null);
}
const [user, setUser] = useState<User | null>(null);
const [loading, setLoading] = useState(true); // Começa como true

useEffect(() => {
  const initAuth = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const res = await api.get('/auth/me');
        setUser(res.data);
      } catch (e) {
        console.error(e);
        localStorage.removeItem('token');
      }
    }
    setLoading(false); // Só aqui o app "acorda"
  };
  initAuth();
}, []);

return (
  <AuthContext.Provider value={{ user, login, logout, loading }}>
    {!loading && children} 
  </AuthContext.Provider>
);
};