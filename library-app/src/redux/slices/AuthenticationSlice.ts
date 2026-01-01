import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { type User, type LoginUserPayload, type RegisterUserPayload  } from '../../models/User';

import axios from 'axios';

interface AuthenticationSliceState {
  loggedInUser: User | undefined;
  loading: boolean;
  loginError: boolean;
  registerError: boolean;
  registerSuccess: boolean;
}

const initialState:AuthenticationSliceState = {
  loggedInUser: undefined,
  loading: false,
  loginError: false,
  registerError: false,
  registerSuccess: false
}

export const loginUser = createAsyncThunk(
  'auth/login',
  async (user:LoginUserPayload, thunkAPI) => {
    try {
      const req = await axios.post('http://localhost:8000/auth/login', user);
      return req.data.user;
    } catch(e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (user:RegisterUserPayload, thunkAPI) => {
    try {
      const req = await axios.post('http://localhost:8000/auth/register', user);
      return req.data.user;
    } catch(e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const AuthenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    resetLoginError(state) {
      state.loginError = false;
    },
    resetRegisterError(state) {
      state.registerError = false;
    },
    resetRegisterSuccess(state) {
      state.registerSuccess = false;
    }
  },
  extraReducers: (builder) => {
    // Pending logic
    builder.addCase(loginUser.pending, (state, action) => {
      state.loginError = false;
      state.loading = true;
    });

    builder.addCase(registerUser.pending, (state, action) => {
      state.registerError = false;
      state.loading = true;
    });

    // Fulfilled logic
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.loggedInUser = action.payload;
    });
    
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.registerSuccess = true;
    });
    
    // Rejected logic
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loginError = true;
      state.loading = false;
    });
    
    builder.addCase(registerUser.rejected, (state, action) => {
      state.registerError = true;
      state.loading = false;
    });
  }
});

export const {resetLoginError, resetRegisterError, resetRegisterSuccess} = AuthenticationSlice.actions;

export default AuthenticationSlice.reducer;