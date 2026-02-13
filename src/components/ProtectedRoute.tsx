import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import type { JSX } from 'react';

export const ProtectedRoute = ({ children, role }: { children: JSX.Element, role: 'CREATOR' | 'EVENTEE' }) => {
  const { user, loading } = useAuth(); // Pegue o loading aqui

  // Se ainda estiver carregando a sessão, não redirecione!
  if (loading) {
    return (
      <div className="loading-spinner">
        <p>Carregando sessão...</p> 
      </div>
    );
  }

  // Agora sim, se terminou de carregar e não tem user, vai para o login
  if (!user) return <Navigate to="/login" />;

  // Se o role for diferente (ex: USER tentando entrar em área de CREATOR)
  if (role && user.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
};