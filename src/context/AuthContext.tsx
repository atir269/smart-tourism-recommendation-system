import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import { api, getApiError } from '../api/client';
import { AuthResponse, User } from '../types';

interface AuthContextValue {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const getStoredUser = () => {
  const stored = localStorage.getItem('smartTravelUser');
  return stored ? (JSON.parse(stored) as User) : null;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(getStoredUser);
  const [token, setToken] = useState<string | null>(localStorage.getItem('smartTravelToken'));

  const persistSession = useCallback((response: AuthResponse) => {
    localStorage.setItem('smartTravelToken', response.token);
    localStorage.setItem('smartTravelUser', JSON.stringify(response.user));
    setToken(response.token);
    setUser(response.user);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const { data } = await api.post<AuthResponse>('/auth/login', { email, password });
      persistSession(data);
    } catch (error) {
      throw new Error(getApiError(error, 'Login failed. Please try again.'));
    }
  }, [persistSession]);

  const register = useCallback(async (name: string, email: string, password: string) => {
    try {
      const { data } = await api.post<AuthResponse>('/auth/register', { name, email, password });
      persistSession(data);
    } catch (error) {
      throw new Error(getApiError(error, 'Registration failed. Please try again.'));
    }
  }, [persistSession]);

  const logout = useCallback(() => {
    localStorage.removeItem('smartTravelToken');
    localStorage.removeItem('smartTravelUser');
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, token, login, register, logout }),
    [user, token, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
};
