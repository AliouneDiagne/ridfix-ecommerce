// src/components/auth/PrivateRoute.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import Spinner from '../ui/Spinner'; 
export default function PrivateRoute({ children }) {
  const { isAuthenticated, status } = useSelector((s) => s.auth);
  const location = useLocation();

  // Durante il ripristino da redux-persist possiamo mostrare un loader
  if (status === 'loading') return <Spinner />;

  // Non autenticato → redirect a /login (salviamo la destinazione)
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Autenticato → rendi i figli
  return children;
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
