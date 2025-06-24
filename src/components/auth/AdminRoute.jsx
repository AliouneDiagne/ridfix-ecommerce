import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import Spinner from '../ui/Spinner'; // Per indicare il caricamento del profilo utente

/**
 * Componente AdminRoute.
 * Protegge le rotte assicurandosi che l'utente sia autenticato e abbia il ruolo 'admin'. [70]
 */
const AdminRoute = ({ children }) => {
  const user = useSelector(state => state.auth.user); // Recupera l'oggetto utente [36]
  const status = useSelector(state => state.auth.status); // Stato del caricamento auth
  const location = useLocation();

  // Se lo stato dell'autenticazione è 'loading', mostra uno spinner [99]
  if (status === 'loading') {
    return <Spinner />;
  }

  // Se l'utente non è loggato o non è un admin, reindirizza al login o a una pagina 404 [70]
  if (!user || user.role !== 'admin') {
    // Puoi scegliere di reindirizzare a '/login' o a '/404' o mostrare un messaggio di accesso negato
    return <Navigate to="/login" state={{ from: location, message: 'Access denied. Administrator privileges required.' }} replace />;
  }

  return children; // Se l'utente è un admin, rende i componenti figli
};

export default AdminRoute;