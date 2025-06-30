/* ---------------------------------------------
 *  src/store/slices/authSlice.js
 *  – gestione autenticazione + persistenza
 * --------------------------------------------*/
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';
import { toast } from 'react-toastify';

/* ─────────────────────────────────────────────
 *  Helpers: persistenza in localStorage
 * ────────────────────────────────────────────*/
const LS_KEY_STATE  = 'authState'; // stato completo (user, token…)
const LS_KEY_TOKEN  = 'token';     // token separato, usato dall'interceptor

const loadAuthState = () => {
  try {
    const stored = localStorage.getItem(LS_KEY_STATE);
    return stored ? JSON.parse(stored) : undefined;
  } catch (err) {
    console.error('Error loading auth state from localStorage:', err);
    return undefined;
  }
};

const saveAuthState = (state) => {
  try {
    localStorage.setItem(LS_KEY_STATE, JSON.stringify(state));
    // salviamo anche solo il token per l’interceptor Axios
    if (state.token) localStorage.setItem(LS_KEY_TOKEN, state.token);
    else             localStorage.removeItem(LS_KEY_TOKEN);
  } catch (err) {
    console.error('Error saving auth state to localStorage:', err);
  }
};

/* ─────────────────────────────────────────────
 *  Stato iniziale
 * ────────────────────────────────────────────*/
const initialState = loadAuthState() || {
  user:            null,
  token:           null,
  isAuthenticated: false,
  status:          'idle',   // idle | loading | succeeded | failed
  error:           null,
};

/* ─────────────────────────────────────────────
 *  Thunk: LOGIN
 * ────────────────────────────────────────────*/
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // JSON-Server: query utenti con email+password
      const { data } = await api.get(`/users`, {
        params: { email, password },
      });

      if (data.length === 0) {
        toast.error('Invalid credentials. Please try again.');
        return rejectWithValue('Invalid credentials');
      }

      const user = data[0]; // ← prendiamo il primo match
      const simulatedToken = `mock-token-${user.id}-${Math.random().toString(36).slice(2)}`;

      toast.success(`Welcome, ${user.name || user.email}!`);
      return { user, token: simulatedToken };
    } catch (err) {
      const message =
        err.response?.data?.message || 'Failed to login. Please try again.';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

/* ─────────────────────────────────────────────
 *  Thunk: REGISTER  (endpoint corretto: /users)
 * ────────────────────────────────────────────*/
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (newUser, { rejectWithValue }) => {
    try {
      const { data: createdUser } = await api.post('/users', newUser);
      toast.success('Registration successful. You can now log in.');
      return createdUser;
    } catch (err) {
      const message =
        err.response?.data?.message || 'Failed to register. Please try again.';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

/* ─────────────────────────────────────────────
 *  Slice
 * ────────────────────────────────────────────*/
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      saveAuthState(state);
      toast.info('You have been logged out.');
    },
    setUserRole(state, action) {
      if (state.user) {
        state.user.role = action.payload;
        saveAuthState(state);
      }
    },
  },
  extraReducers: (builder) => {
    /* ----- LOGIN ----- */
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.user = payload.user;
        state.token = payload.token;
        state.isAuthenticated = true;
        saveAuthState(state);
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        saveAuthState(state);
      });

    /* ----- REGISTER ----- */
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload;
      });
  },
});

export const { logout, setUserRole } = authSlice.actions;
export default authSlice.reducer;
