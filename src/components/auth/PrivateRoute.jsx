import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

/**
 * Componente PrivateRoute.
 * Se l'utente non è autenticato, lo reindirizza alla pagina di login. [70]
 */
const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector(state => !!state.auth.user); // Controlla lo stato di autenticazione [36]
  const location = useLocation();

  if (!isAuthenticated) {
    // Reindirizza l'utente non autenticato alla pagina di login,
    // salvando la location attuale per reindirizzare dopo il login. [70]
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children; // Se autenticato, rende i componenti figli
};
export default PrivateRoute;