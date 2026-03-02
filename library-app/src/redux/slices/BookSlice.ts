import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from 'axios';
import type { Book } from '../../models/Book';

interface BookSliceState {
  loading: boolean;
  error: boolean;
  books: Book[];
}

const initialState:BookSliceState = {
  loading: true,
  error: false,
  books: []
}

export const fetchAllBooks = createAsyncThunk(
  'book/all',
  async (payload, thunkAPI) => {
    try {
      const req = await axios.get('http://localhost:8000/book/');
      return req.data.books;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
)

export const BookSlice = createSlice({
  name: 'book',
  initialState,
  reducers:{},
  extraReducers: (builder) => {
    builder.addCase(fetchAllBooks.pending, (state, action) => {
      state.books = [];
      state.loading = true;
    });
    
    builder.addCase(fetchAllBooks.fulfilled, (state, action) => {
      state.books = action.payload;
      state.loading = false;
    });
  }
})

// eslint-disable-next-line no-empty-pattern
export const {} = BookSlice.actions;
export default BookSlice.reducer;