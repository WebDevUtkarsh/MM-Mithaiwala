// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user } = useAuth();
  console.log(user)

  if (!user) {
    // User is not logged in
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // User does not have the required role
    alert('Access denied: insufficient permissions.');
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
