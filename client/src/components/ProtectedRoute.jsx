// src/components/ProtectedRoute.jsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // Check if the authentication token exists in local storage
  const token = localStorage.getItem('access_token');

  // The 'replace' prop in Navigate is important. It prevents the user from
  // using the "back" button to get back to the protected page after being redirected.
  return token ? <Outlet /> : <Navigate to="/loginsignup" replace />;
};

export default ProtectedRoute;