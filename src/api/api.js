import axios from 'axios';
import { toast } from 'react-toastify'; // Importa toast per le notifiche

// Crea un'istanza di Axios con una base URL dinamica dalla variabile d'ambiente
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // URL del tuo backend simulato (JSON-Server)
});

// Aggiunge un interceptor per le richieste
// Questo intercettore verrà eseguito prima che ogni richiesta venga inviata
api.interceptors.request.use(
  (config) => {
    // Recupera il token di autenticazione dal localStorage
    const token = localStorage.getItem('token');
    // Se un token esiste, lo aggiunge all'header 'Authorization'
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Formato standard Bearer Token
    }
    return config; // Restituisce la configurazione della richiesta modificata
  },
  (error) => {
    // Gestisce eventuali errori durante la preparazione della richiesta
    return Promise.reject(error);
  }
);

// Aggiunge un interceptor per le risposte
// Questo intercettore verrà eseguito per ogni risposta ricevuta dal server
api.interceptors.response.use(
  (response) => {
    // Se la risposta è positiva, la restituisce direttamente
    return response;
  },
  (error) => {
    // Gestisce gli errori delle risposte (es. 401 Unauthorized, 404 Not Found)
    if (error.response) {
      // In base allo stato della risposta HTTP, mostra un messaggio toast specifico
      switch (error.response.status) {
        case 401:
          toast.error('Authentication failed. Please log in again.');
          // Potresti anche reindirizzare l'utente alla pagina di login qui
          // window.location.href = '/login';
          break;
        case 404:
          toast.error('Resource not found.');
          break;
        case 500:
          toast.error('Server error. Please try again later.');
          break;
        default:
          toast.error(`An error occurred: ${error.response.statusText}`);
      }
    } else if (error.request) {
      // L'errore è dovuto alla mancanza di risposta dal server (es. server non attivo)
      toast.error('No response from server. Check your network or API server.');
    } else {
      // Altri errori (es. errori di configurazione di Axios)
      toast.error(`Error: ${error.message}`);
    }
    return Promise.reject(error); // Propaga l'errore per essere gestito dai chiamanti
  }
);

export default api; // Esporta l'istanza di Axios configurata