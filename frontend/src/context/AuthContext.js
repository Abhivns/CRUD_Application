import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { fetchProfile, loginUser, registerUser } from '../api/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      if (!token) {
        localStorage.removeItem('token');
        setUser(null);
        setInitializing(false);
        return;
      }

      localStorage.setItem('token', token);

      try {
        const response = await fetchProfile();
        setUser(response.user);
      } catch (error) {
        localStorage.removeItem('token');
        setToken('');
        setUser(null);
      } finally {
        setInitializing(false);
      }
    }

    loadProfile();
  }, [token]);

  async function login(payload) {
    const response = await loginUser(payload);
    setToken(response.token);
    setUser(response.user);
    return response;
  }

  async function register(payload) {
    const response = await registerUser(payload);
    setToken(response.token);
    setUser(response.user);
    return response;
  }

  function logout() {
    localStorage.removeItem('token');
    setToken('');
    setUser(null);
  }

  const value = useMemo(
    () => ({ token, user, initializing, login, register, logout }),
    [token, user, initializing]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
