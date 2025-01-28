import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import recipeList from '../mock/recipes.json';

// Create the AuthContext
export const AuthContext = createContext();

// Custom hook to use AuthContext
export function useAuth() {
  return useContext(AuthContext);
}

// AuthProvider component to manage authentication state
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);  // Track loading state
  const location = useLocation();

  // On component mount, check if user data exists in localStorage
  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser) {
        if (storedUser.loggedin) setIsAuthenticated(true);
        setUser(storedUser);
      }
    } catch (error) {
      console.error('Error parsing user data from localStorage:', error);
    } finally {
      setLoading(false); // Ensure loading state is false once data is checked
    }
  }, [location]); // Empty array ensures this runs only once when component mounts

  // Function to log in
  const login = (userData) => {
    if (userData.recipeList && !userData.recipeList.length) {
      userData.recipeList = recipeList.recipes;
    }
    localStorage.setItem('user', JSON.stringify(userData));  // Save user data to localStorage
    setIsAuthenticated(true);
    setUser(userData);  // Store user data after login
  };

  // Function to log out
  const logout = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));  // Update flag for user data from localStorage
    setIsAuthenticated(false);
  };

  const update = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));  // Update list of user recipe to localStorage
    setUser(userData);  // Store user data after login
  };

  // If loading, render nothing or a loading spinner
  if (loading) {
    return <div>Loading...</div>; // You can replace this with a spinner
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, update }}>
      {children}
    </AuthContext.Provider>
  );
};