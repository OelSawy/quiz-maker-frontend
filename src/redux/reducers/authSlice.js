import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';
import { apiRoutes } from '../../utils/apiRoutes';

const storedUser = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null;

export const registerUser = createAsyncThunk(
  'auth/register',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post(apiRoutes.register, payload);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Register failed');
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post(apiRoutes.login, payload);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Login failed');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post(apiRoutes.logout);
      if (localStorage.getItem('user')) {
        localStorage.removeItem('user');
      }
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Logout failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: storedUser,
    registerStatus: 'idle',
    loginStatus: 'idle',
    logoutStatus: 'idle',
    error: null,
  },
  reducers: {
    resetAuthStatuses: state => {
      state.registerStatus = 'idle';
      state.loginStatus = 'idle';
      state.logoutStatus = 'idle';
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(registerUser.pending, state => {
        state.registerStatus = 'loading';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.registerStatus = 'succeeded';
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerStatus = 'failed';
        state.error = action.payload;
      })
      .addCase(loginUser.pending, state => {
        state.loginStatus = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginStatus = 'succeeded';
        state.user = action.payload.user;
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginStatus = 'failed';
        state.error = action.payload;
      })
      .addCase(logoutUser.pending, state => {
        state.logoutStatus = 'loading';
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, state => {
        state.logoutStatus = 'succeeded';
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.logoutStatus = 'failed';
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
export const { resetAuthStatuses } = authSlice.actions;
