import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { type User, type LoginUserPayload, type RegisterUserPayload, type FetchUserPayload  } from '../../models/User';

import axios from 'axios';

interface AuthenticationSliceState {
  loggedInUser: User | undefined;
  profileUser: User | undefined;
  loading: boolean;
  loginError: boolean;
  registerError: boolean;
  userError: boolean;
  registerSuccess: boolean;
}

const initialState:AuthenticationSliceState = {
  loggedInUser: undefined,
  profileUser: undefined,
  loading: false,
  loginError: false,
  registerError: false,
  userError: false,
  registerSuccess: false
}

type ResetUser = FetchUserPayload['property'];

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

export const fetchUser = createAsyncThunk(
  'auth/fetch',
  async (payload:FetchUserPayload, thunkAPI) => {
    try {
      const req = await axios.get(`http://localhost:8000/users/${payload.userId}`);

      const user = req.data.user;

      return {
        user,
        property: payload.property
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const updateUser = createAsyncThunk(
  'auth/update',
  async (payload:User, thunkAPI) => {
    try {
      const req = await axios.put('http://localhost:8000/users', payload);
      return req.data.user;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
)

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
    },
    resetUser(state, action:PayloadAction<ResetUser>) {
      state[action.payload] = undefined;
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

    builder.addCase(fetchUser.pending, (state, action) => {
      state.userError = false;
      state.loading = true;
    });

    builder.addCase(updateUser.pending, (state, action) => {
      state.userError = false;
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

    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state[action.payload.property] = action.payload.user;
      state.loading = false;
    });
    
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loggedInUser = action.payload;
      state.profileUser = action.payload;
      state.loading = false;
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
    
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.userError = true;
      state.loading = false;
    });
    
    builder.addCase(updateUser.rejected, (state, action) => {
      state.userError = true;
      state.loading = false;
    });
  }
});

export const { resetLoginError, resetRegisterError, resetRegisterSuccess, resetUser } = AuthenticationSlice.actions;

export default AuthenticationSlice.reducer;