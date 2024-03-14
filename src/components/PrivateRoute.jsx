import React, { useEffect } from 'react';
import { useAuth } from '../context/auth.js';
import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute() {
  const [auth] = useAuth();
  if (!auth.user) return <Navigate to="/login" />;
  
  // If user is authenticated, render the child components
  return <Outlet />;
}

export default PrivateRoute;