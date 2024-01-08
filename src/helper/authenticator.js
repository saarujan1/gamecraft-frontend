import React, { createContext, useContext, useState, useEffect } from 'react';
import { handleUserLogin } from '../services/api'; // Update the path to where api.js is located

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const signIn = async (username, password) => {
    try {
      // Here we call the actual API function for signing in
      const response = await handleUserLogin({ username, password });
      // Assuming the response will have a property "token" with the JWT
      localStorage.setItem('authToken', response.token);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Sign-in error:', error);
      setIsAuthenticated(false);
    }
  };

  const signOut = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);