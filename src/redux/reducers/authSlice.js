import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';
import { apiRoutes } from '../../utils/apiRoutes';

export const registerUser = createAsyncThunk(
  'auth/register',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post(apiRoutes.register, payload);
      return response.data; // user/token
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Register failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    status: 'idle', // idle | loading | succeeded | failed
    error: null
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;