import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

// PrivateRoute è un componente che avvolge altre rotte per proteggerle.
// Se l'utente non è autenticato, viene reindirizzato alla pagina di login.
const PrivateRoute = ({ element }) => {
  // useSelector per accedere allo stato di autenticazione da Redux
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const location = useLocation(); // Hook per ottenere l'oggetto location (URL corrente)

  // Se l'utente NON è autenticato
  if (!isAuthenticated) {
    // Reindirizza l'utente alla pagina di login.
    // `replace` fa sì che la pagina di login sostituisca la voce corrente nello storico del browser,
    // in modo che l'utente non possa tornare indietro alla pagina protetta con il tasto "indietro".
    // `state: { from: location }` è utile per reindirizzare l'utente alla pagina originale dopo il login.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Se l'utente è autenticato, renderizza il componente figlio (la pagina protetta)
  return element;
};

export default PrivateRoute;