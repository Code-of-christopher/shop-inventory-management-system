/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from 'react';
import api from '../api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const { data } = await api.get('/auth/user');
          setAuth({ token, user: data });
        } catch (error) {
          console.error('Failed to load user', error);
        }
      }
    };
    loadUser();
  }, []);

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
