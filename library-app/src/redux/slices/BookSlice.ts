import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from 'axios';
import type { Book } from '../../models/Book';
import type { PageInfo } from '../../models/Page';

interface BookSliceState {
  loading: boolean;
  error: boolean;
  books: Book[];
  pagingInformation: PageInfo | null;
}

const initialState:BookSliceState = {
  loading: true,
  error: false,
  books: [],
  pagingInformation: null
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

export const queryBooks = createAsyncThunk (
  'book/query',
  async (payload:string, thunkAPI) => {
    try {
      const req = await axios.get(`http://localhost:8000/book/query${payload}`);
      return req.data.page;
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
    
    builder.addCase(queryBooks.pending, (state, action) => {
      state.books = [];
      state.loading = true;
    });
    
    builder.addCase(fetchAllBooks.fulfilled, (state, action) => {
      state.books = action.payload;
      state.loading = false;
    });

    builder.addCase(queryBooks.fulfilled, (state, action) => {
      state.books = action.payload.items;
      state.pagingInformation = {
        totalCount: action.payload.totalCount,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages,
        limit: action.payload.limit,
        pageCount: action.payload.pageCount
      }
      state.loading = false
    });
  }
})

// eslint-disable-next-line no-empty-pattern
export const {} = BookSlice.actions;
export default BookSlice.reducer;