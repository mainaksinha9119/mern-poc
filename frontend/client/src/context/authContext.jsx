import { createContext, useEffect, useState } from 'react';
import auth from '../api/auth';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (!storedUser || !storedToken) {
      setLoading(false);
      return;
    }

    try {
      setUser(JSON.parse(storedUser));
    } catch {
      setUser(null);
    }

    setLoading(false);
  }, []);

  const saveSession = (userData, token) => {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
  };

  const register = async (data) => {
    const res = await auth.register(data);
    if (res?.data?.token) {
      setUser(res.data.user);
      saveSession(res.data.user, res.data.token);
    }
    return res;
  };

  const login = async (data) => {
    const res = await auth.login(data);
    if (res?.data?.token) {
      setUser(res.data.user);
      saveSession(res.data.user, res.data.token);
    }
    return res;
  };

  return (
    <AuthContext.Provider value={{ user, loading, setUser, register, login }}>
      {children}
    </AuthContext.Provider>
  );
};
