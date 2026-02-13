import { api } from './axios';

export const login = async (email: string, password: string) => {
  const res = await api.post('/auth/login', { email, password });
  
  // Se o login for sucesso, guardamos o token
  if (res.data.access_token) {
    localStorage.setItem('token', res.data.access_token);
    // Configura o axios para usar este token em chamadas futuras imediatamente
    api.defaults.headers.common['Authorization'] = `Bearer ${res.data.access_token}`;
  }
  
  return res.data;
};

export const register = async (data: {
  name: string;
  email: string;
  password: string;
  role: 'CREATOR' | 'EVENTEE';
}) => {
  const res = await api.post('/auth/register', data);
  
  // Se o registo já logar o user automaticamente:
  if (res.data.access_token) {
    localStorage.setItem('token', res.data.access_token);
    api.defaults.headers.common['Authorization'] = `Bearer ${res.data.access_token}`;
  }
  
  return res.data;
};

// Adiciona esta função para o Logout
export const logout = () => {
  localStorage.removeItem('token');
  delete api.defaults.headers.common['Authorization'];
  window.location.href = '/login'; // Força o refresh para limpar o estado
};
