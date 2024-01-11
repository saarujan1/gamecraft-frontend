import React, { createContext, useContext, useState, useEffect } from 'react';
import { handleUserLogin } from '../services/api'; // Update the path to where api.js is located

// Create a context to manage authentication state and actions
const AuthContext = createContext();

// AuthProvider component to wrap the application and provide authentication context
export const AuthProvider = ({ children }) => {
  // State to track if the user is authenticated and the current username
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  // Function to handle user sign-in
  const signIn = async (username, password) => {
    try {
      // Call the actual API function for signing in
      const response = await handleUserLogin({ username, password });
      
      // Set the username and update authentication status
      setUsername(username);
      // Assuming the response will have a property "token" with the JWT
      localStorage.setItem('authToken', username);
      setIsAuthenticated(true);
      return true; // Sign-in successful
    } catch (error) {
      console.error('Sign-in error:', error);
      setIsAuthenticated(false);
      throw new Error('Authentication failed'); // Throw error if sign-in fails
    }
  };

  // Function to handle user sign-out
  const signOut = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  // Use effect to check local storage for authentication token on component mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, []);

  // Provide the authentication context to the wrapped components
  return (
    <AuthContext.Provider value={{ isAuthenticated, username, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access the authentication context in functional components
export const useAuth = () => useContext(AuthContext);
