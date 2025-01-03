import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // Check for accessToken in localStorage
  const accessToken = localStorage.getItem('accessToken');

  // Debugging: Log authentication state and accessToken
  console.log('ProtectedRoute - isAuthenticated:', isAuthenticated);
  console.log('ProtectedRoute - accessToken:', accessToken);
  console.log('ProtectedRoute - loading:', loading);

  // Wait for authentication state to initialize
  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner or placeholder
  }

  // If there's no accessToken or the user is not authenticated, redirect to login
  if (!accessToken || !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Render the protected component if the user is authenticated
  return children;
};

export default ProtectedRoute;