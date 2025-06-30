import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import Spinner from '../ui/Spinner';

/**
 * Blocca le route protette finché:
 * 1. redux-persist ha completato la re-hydration
 * 2. l’utente risulta autenticato
 */
export default function PrivateRoute({ children }) {
  const { isAuthenticated, status, _persist } = useSelector((s) => s.auth);
  const location = useLocation();
  const [rehydrated, setRehydrated] = useState(false);

  // redux-persist aggiunge _persist: { rehydrated: boolean }
  useEffect(() => {
    if (_persist?.rehydrated) setRehydrated(true);
  }, [_persist]);

  // Mostra loader finché non è tutto pronto
  if (!rehydrated || status === 'loading') return <Spinner />;

  // Se non loggato → redirect al login (salvando la destinazione)
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Utente autenticato → renderizza i figli
  return children;
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
