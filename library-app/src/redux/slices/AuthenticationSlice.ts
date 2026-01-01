import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { type User, type LoginUserPayload, } from '../../models/User';

import axios from 'axios';

interface AuthenticationSliceState {
  loggedInUser: User | undefined;
  loading: boolean;
  error: boolean;
  registerSuccess: boolean;
}

const initialState:AuthenticationSliceState = {
  loggedInUser: undefined,
  loading: false,
  error: false,
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

export const AuthenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    // Pending logic
    builder.addCase(loginUser.pending, (state, action) => {
      state.error = false;
      state.loading = true;
    });

    // Fulfilled logic
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.loggedInUser = action.payload;
    });
    
    // Rejected logic
    builder.addCase(loginUser.rejected, (state, action) => {
      state.error = true;
      state.loading = false;
    });
  }
});

export const {} = AuthenticationSlice.actions;

export default AuthenticationSlice.reducer;