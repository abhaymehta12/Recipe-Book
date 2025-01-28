import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../views/Home';
import Addrecipe from '../views/Addrecipe';
import Login from '../views/Login';
import Register from '../views/Register';
import { useAuth } from '../context/auth';  // Import the custom hook

// Custom AuthenticatedRoute component
function AuthenticatedRoute({ children }) {
  const { isAuthenticated } = useAuth();  // Access authentication state from context
  if (!isAuthenticated) {
    return <Navigate to="/Recipe-Book/login" />;  // Redirect to login if not authenticated
  }

  return children;  // If authenticated, render the protected route
}

const Navigation = () => {
  return (
    <Routes>
      <Route path="/Recipe-Book/login" element={<Login />} />
      <Route path="/Recipe-Book/register" element={<Register />} />
      <Route path="/Recipe-Book/home" element={<AuthenticatedRoute><Home /></AuthenticatedRoute>} />
      <Route path="/Recipe-Book/addrecipe" element={<AuthenticatedRoute><Addrecipe /></AuthenticatedRoute>} />
      <Route path="*" element={<Navigate to="/Recipe-Book/home" />} />
    </Routes>
  );
};

export default Navigation;