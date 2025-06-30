/* -------------------------------------------------
 *  src/api/api.js
 *  – istanza Axios pre-configurata + intercettori
 * ------------------------------------------------*/
import axios from 'axios';
import { toast } from 'react-toastify';

const LS_KEY_TOKEN = 'token';          // ↳ chiave unica per il bearer
const API_BASE_URL = 'http://localhost:3001'; // JSON-Server locale

/* ──────────────────────────────────────────────
 *  1. Crea l’istanza
 * ────────────────────────────────────────────*/
const api = axios.create({ baseURL: API_BASE_URL });

/* ──────────────────────────────────────────────
 *  2. Interceptor REQUEST – allega il token
 * ────────────────────────────────────────────*/
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(LS_KEY_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* ──────────────────────────────────────────────
 *  3. Interceptor RESPONSE – gestione errori
 * ────────────────────────────────────────────*/
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;

      switch (status) {
        case 401:
          toast.error('Autenticazione fallita. Accedi di nuovo.');
          break;
        case 404:
          toast.error('Risorsa non trovata.');
          break;
        case 500:
          toast.error('Errore del server. Riprova più tardi.');
          break;
        default:
          toast.error(`Errore: ${error.response.statusText || status}`);
      }
    } else if (error.request) {
      toast.error(
        'Nessuna risposta dal server. Controlla la connessione o se il server API è attivo.'
      );
    } else {
      toast.error(`Errore: ${error.message}`);
    }
    return Promise.reject(error);
  }
);

export default api;
