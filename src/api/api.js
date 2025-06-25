import axios from 'axios';
import { toast } from 'react-toastify';

const api = axios.create({
  baseURL: 'http://localhost:3001', // ✅ fissa per JSON Server locale
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
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
          toast.error(`Errore: ${error.response.statusText}`);
      }
    } else if (error.request) {
      toast.error('Nessuna risposta dal server. Controlla la connessione o se il server API è attivo.');
    } else {
      toast.error(`Errore: ${error.message}`);
    }
    return Promise.reject(error);
  }
);

export default api;
