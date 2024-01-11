import React, { createContext, useContext, useState, useEffect } from 'react';
import { handleUserLogin } from '../services/api'; // Update the path to where api.js is located

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  const signIn = async (username, password) => {
    try {
      // Here we call the actual API function for signing in
      const response = await handleUserLogin({ username, password });
      setUsername(username);
      // Assuming the response will have a property "token" with the JWT
      localStorage.setItem('authToken', username);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('Sign-in error:', error);
      setIsAuthenticated(false);
      throw new Error('Authentication failed');
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
    <AuthContext.Provider value={{ isAuthenticated, username, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);