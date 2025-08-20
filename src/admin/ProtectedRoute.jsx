import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router';
import { isTokenExpired } from '../utils/auth';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const location = useLocation();

  useEffect(() => {
    if (token && isTokenExpired(token)) {
      localStorage.removeItem('token');
      window.location.href = '/admin/login';
    }
  }, [token]);

  if (!token || isTokenExpired(token)) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;