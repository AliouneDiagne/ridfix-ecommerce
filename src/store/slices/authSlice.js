import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api'; // Importa l'istanza Axios configurata
import { toast } from 'react-toastify'; // Per le notifiche utente

// Funzione di utilità per leggere lo stato di autenticazione dal localStorage
const loadAuthState = () => {
  try {
    const serializedState = localStorage.getItem('authState');
    if (serializedState === null) {
      return undefined; // Nessuno stato salvato
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Error loading auth state from localStorage:", err);
    return undefined;
  }
};

// Funzione di utilità per salvare lo stato di autenticazione nel localStorage
const saveAuthState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('authState', serializedState);
  } catch (err) {
    console.error("Error saving auth state to localStorage:", err);
  }
};

// Stato iniziale, tenta di caricarlo dal localStorage
const initialState = loadAuthState() || {
  user: null, // Oggetto utente (es. { id, email, role })
  token: null, // Token di autenticazione simulato
  isAuthenticated: false, // Flag per lo stato di autenticazione
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null, // Messaggio di errore
};

// createAsyncThunk per la simulazione del login
// Prende email e password e simula una chiamata API
export const loginUser = createAsyncThunk(
  'auth/loginUser', // Prefisso per i tipi di azione generati
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // Simulazione di una chiamata API GET per verificare le credenziali
      // In un'app reale, useresti api.post('/login', { email, password })
      const response = await api.get(`/users?email=${email}&password=${password}`);
      const users = response.data;

      if (users.length > 0) {
        // Se un utente con quelle credenziali esiste
        const user = users;
        // In un'app reale, il backend restituirebbe un token JWT
        const simulatedToken = `mock-token-${user.id}-${Math.random().toString(36).substring(7)}`;
        toast.success(`Welcome, ${user.name || user.email}!`); // Notifica di successo
        return { user: { ...user, role: user.role || 'user' }, token: simulatedToken }; // Restituisce i dati utente e il token
      } else {
        // Se nessun utente corrisponde alle credenziali
        toast.error('Invalid credentials. Please try again.'); // Notifica di errore
        return rejectWithValue('Invalid credentials');
      }
    } catch (error) {
      // Gestione degli errori di rete o API
      let errorMessage = 'Failed to login. Please try again.';
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      toast.error(errorMessage); // Notifica di errore generico
      return rejectWithValue(errorMessage);
    }
  }
);

// createSlice definisce lo stato, i reducer e le azioni
const authSlice = createSlice({
  name: 'auth', // Nome dello slice
  initialState, // Stato iniziale
  reducers: {
    // Azione per il logout
    logout: (state) => {
      state.user = null; // Resetta i dati utente
      state.token = null; // Rimuove il token
      state.isAuthenticated = false; // Imposta lo stato a non autenticato
      saveAuthState(state); // Salva lo stato aggiornato nel localStorage
      toast.info('You have been logged out.'); // Notifica di logout
    },
    // Azione per impostare il ruolo (utile per test o gestione admin)
    setUserRole: (state, action) => {
      if (state.user) {
        state.user.role = action.payload;
        saveAuthState(state); // Salva lo stato con il nuovo ruolo
      }
    },
  },
  // extraReducers gestisce le azioni generate da createAsyncThunk (pending, fulfilled, rejected)
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading'; // Stato di caricamento durante la login
        state.error = null; // Resetta gli errori precedenti
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded'; // Login riuscito
        state.user = action.payload.user; // Imposta i dati utente
        state.token = action.payload.token; // Imposta il token
        state.isAuthenticated = true; // Imposta lo stato a autenticato
        saveAuthState(state); // Salva lo stato nel localStorage dopo il successo
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed'; // Login fallito
        state.error = action.payload; // Imposta il messaggio di errore
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        saveAuthState(state); // Salva lo stato (non autenticato) nel localStorage
      });
  },
});

// Esporta l'azione di logout
export const { logout, setUserRole } = authSlice.actions;
// Esporta il reducer
export default authSlice.reducer;