import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';
import { toast } from 'react-toastify';

// 🔐 REGISTER USER (fake async)
export const registerUser = createAsyncThunk(
  'users/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const res = await api.post('/users', userData);
      toast.success('User registered successfully');
      return res.data;
    } catch (err) {
      toast.error('Registration failed');
      return rejectWithValue(err.message);
    }
  }
);

// 👤 FETCH USER PROFILE by email (mocked)
export const fetchUserProfile = createAsyncThunk(
  'users/fetchUserProfile',
  async (email, { rejectWithValue }) => {
    try {
      const res = await api.get(`/users?email=${email}`);
      if (res.data.length === 0) {
        throw new Error('User not found');
      }
      return res.data[0]; // Assumes unique email
    } catch (err) {
      toast.error('Profile fetch failed');
      return rejectWithValue(err.message);
    }
  }
);

// 🔧 Initial state
const initialState = {
  profile: null,
  status: 'idle',
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearUserProfile(state) {
      state.profile = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profile = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

// ✅ EXPORTS
export const { clearUserProfile } = usersSlice.actions;
export default usersSlice.reducer;
