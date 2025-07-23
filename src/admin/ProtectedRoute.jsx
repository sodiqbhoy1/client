import React from 'react';
import { Navigate, useLocation } from 'react-router';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const location = useLocation();

  if (!token) {
    // If the user is not authenticated, redirect them to the login page.
    // We save the location they were trying to access in the state.
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // If the user is authenticated, render the component they were trying to access.
  return children;
};

export default ProtectedRoute;