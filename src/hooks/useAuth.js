import { useSelector, useDispatch } from 'react-redux';
import { loginUser, logout } from '../store/slices/authSlice'; // Importa le azioni definite nello slice

// Custom hook per la gestione dell'autenticazione
export function useAuth() {
  const dispatch = useDispatch(); // Hook per dispatchare azioni Redux
  // Seleziona le parti dello stato 'auth' che interessano
  const { user, token, isAuthenticated, status, error } = useSelector(s => s.auth);

  // Funzione per effettuare il login, dispatcha l'azione loginUser
  const signIn = (credentials) => dispatch(loginUser(credentials));
  // Funzione per effettuare il logout, dispatcha l'azione logout
  const signOut = () => dispatch(logout());

  // Restituisce lo stato e le funzioni per essere utilizzate nei componenti
  return { user, token, isAuthenticated, status, error, signIn, signOut };
}