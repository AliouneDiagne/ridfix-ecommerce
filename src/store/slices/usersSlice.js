import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Simulazione fetch
export const fetchUserProfile = createAsyncThunk('user/fetchProfile', async (userId) => {
  const response = await fetch(`/api/users/${userId}`);
  return await response.json();
});

const userSlice = createSlice({
  name: 'user',
  initialState: { profile: null },
  reducers: {
    clearUserProfile: (state) => {
      state.profile = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
  },
});

export const { clearUserProfile } = userSlice.actions;
export default userSlice.reducer;
