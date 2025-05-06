import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAdminLoggedIn } from '../utils/localStorage';

export default function ProtectedRoute({ children }) {
  if (!isAdminLoggedIn()) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" replace />;
  }

  return children;
}