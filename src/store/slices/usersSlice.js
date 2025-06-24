import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

// 🔄 AsyncThunk: registrazione utente
export const registerUser = createAsyncThunk(
  'users/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      localStorage.setItem('user', JSON.stringify(userData));
      return userData;
    } catch {
      return rejectWithValue('Registration failed');
    }
  }
);

// 🔄 AsyncThunk: recupero profilo utente
export const fetchUserProfile = createAsyncThunk(
  'users/fetchUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (!storedUser) throw new Error('No user found');
      return storedUser;
    } catch {
      return rejectWithValue('Failed to fetch user profile');
    }
  }
);

// Stato iniziale
const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  isAuthenticated: !!localStorage.getItem('user'),
  status: 'idle', // per il caricamento profilo
};

// Slice
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
      toast.info('User logged out.');
    },
    clearUserProfile: (state) => {
      state.user = null;
      state.status = 'idle';
      toast.info('User profile cleared.');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        toast.success('Registration successful!');
      })
      .addCase(registerUser.rejected, () => {
        toast.error('Registration failed.');
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = 'succeeded';
        state.isAuthenticated = true;
      })
      .addCase(fetchUserProfile.rejected, (state) => {
        state.user = null;
        state.status = 'failed';
        state.isAuthenticated = false;
        toast.error('Failed to fetch user profile.');
      });
  },
});

// ✅ Export corretti
export const { logout, clearUserProfile } = usersSlice.actions;
export default usersSlice.reducer;
