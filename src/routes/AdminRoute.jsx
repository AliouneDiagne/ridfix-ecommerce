import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify'; // Per le notifiche

// AdminRoute è un componente per proteggere le rotte che richiedono privilegi di amministratore.
// Reindirizza l'utente se non è autenticato o se non ha il ruolo 'admin'.
const AdminRoute = ({ element }) => {
  // useSelector per accedere allo stato di autenticazione e ai dati dell'utente da Redux
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const location = useLocation(); // Hook per ottenere l'oggetto location (URL corrente)

  // 1. Controlla se l'utente è autenticato
  if (!isAuthenticated) {
    toast.warn('You need to log in to access this page.'); // Notifica all'utente
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. Controlla se l'utente ha il ruolo di 'admin'
  // Si assicura che `user` esista prima di accedere a `user.role`
  if (user && user.role !== 'admin') {
    toast.error('Access denied. You do not have administrator privileges.'); // Notifica all'utente
    return <Navigate to="/" replace />; // Reindirizza alla home page
  }

  // Se l'utente è autenticato e ha il ruolo 'admin', renderizza il componente figlio
  return element;
};

export default AdminRoute;