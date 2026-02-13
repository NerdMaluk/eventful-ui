import { createContext } from 'react';
import type { User } from '../types/user';

export interface AuthContextType {
  user: User | null;         // Alterado: Pode ser null no início
  login: (token: string, user: User) => void;
  logout: () => void;
  loading: boolean;          // Adicionado: Para evitar redirects antes da hora
}

// Manter o null aqui no createContext é o padrão correto
export const AuthContext = createContext<AuthContextType | null>(null);
