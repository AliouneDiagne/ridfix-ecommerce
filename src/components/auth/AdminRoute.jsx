import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Spinner from '../ui/Spinner';

export default function AdminRoute({ children }) {
  const { user, isAuthenticated, status } = useSelector((s) => s.auth);
  const location = useLocation();

  /* 1) Caricamento auth state  */
  if (status === 'loading') return <Spinner />;

  /* 2) Verifica permesso */
  const isAdmin = isAuthenticated && user?.role === 'admin';
  if (!isAdmin) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location,
          message: 'Access denied. Administrator privileges required.',
        }}
      />
    );
  }

  return children ? children : <Outlet />;
}
