import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { Book, CheckInBookPayload, CheckOutBookPayload } from '../../models/Book';
import type { PageInfo } from '../../models/Page';

interface BookSliceState {
  books: Book[];
  currentBook?: Book;
  loadingCatalog: boolean;
  loadingSearch: boolean;
  loadingLoan: boolean;
  catalogError: boolean;
  searchError: boolean;
  checkoutBookError: boolean;
  checkinBookError: boolean;
  pagingInformation?: PageInfo;
}

const initialState:BookSliceState = {
  books: [],
  currentBook: undefined,
  loadingCatalog: false,
  loadingSearch: false,
  loadingLoan: false,
  catalogError: false,
  searchError: false,
  checkoutBookError: false,
  checkinBookError: false,
  pagingInformation: undefined
}

export const fetchAllBooks = createAsyncThunk(
  'book/all',
  async (_, thunkAPI) => {
    try {
      const req = await axios.get('http://localhost:8000/book/');
      return req.data.books;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return thunkAPI.rejectWithValue(
          e.response?.data?.message || e.message
        );
      }
      
      return thunkAPI.rejectWithValue("Unknown error");
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
      if (axios.isAxiosError(e)) {
        return thunkAPI.rejectWithValue(
          e.response?.data?.message || e.message
        );
      }
      
      return thunkAPI.rejectWithValue("Unknown error");
    }
  }
)

export const checkoutBook = createAsyncThunk (
  'book/checkout',
  async (payload:CheckOutBookPayload, thunkAPI) => {
    try {
      const returnDate = new Date();
      returnDate.setDate(returnDate.getDate() +14);

      const getPatron = await axios.get(`http://localhost:8000/card/${payload.libraryCard}`);

      const patronId = getPatron.data.libraryCard.user;

      const record = {
        status: "LOANED",
        loanedDate: new Date(),
        dueDate: returnDate,
        patron: patronId,
        employeeOut: payload.employee._id,
        item: payload.book._id
      }

      const loanReq = await axios.post('http://localhost:8000/loan', record);
      const loan = loanReq.data.record;

      return loan;

    } catch (e) {
      if (axios.isAxiosError(e)) {
        return thunkAPI.rejectWithValue(
          e.response?.data?.message || e.message
        );
      }
      
      return thunkAPI.rejectWithValue("Unknown error");
    }
  }
)

export const checkinBook = createAsyncThunk (
  'book/checkin',
  async(payload:CheckInBookPayload, thunkAPI) => {
    try {
      const record = payload.book.records?.reduce((latest, current) => {
        return new Date(current.createdAt).getTime() >
          new Date(latest.createdAt).getTime()
          ? current
          : latest;
      });

      if (!record) {
        return thunkAPI.rejectWithValue("No active loan record found");
      }

      const updatedRecord = {
        status: "AVAILABLE",
        loanedDate: record.loanedDate,
        dueDate: record.dueDate,
        returnedDate: new Date(),
        patron: record.patron,
        employeeOut: record.employeeOut,
        employeeIn: payload.employee._id,
        item: record.item,
        _id: record._id
      }

      const loan = await axios.put('http://localhost:8000/loan', updatedRecord);
    
      return loan.data.record;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return thunkAPI.rejectWithValue(
          e.response?.data?.message || e.message
        );
      }
      
      return thunkAPI.rejectWithValue("Unknown error");
    }
  } 
)

export const BookSlice = createSlice({
  name: 'book',
  initialState,
  reducers:{
    setCurrentBook(state, action:PayloadAction<Book | undefined>){
      state.currentBook = action.payload;
    },
    resetBookCheckoutError(state) {
      state.checkoutBookError = false;
    }
  },
  extraReducers: (builder) => {
    // Pending logic
    builder.addCase(fetchAllBooks.pending, (state) => {
      state.catalogError = false;
      state.loadingCatalog = true;
    });
    
    builder.addCase(queryBooks.pending, (state) => {
      state.searchError = false;
      state.loadingSearch = true;
    });

    builder.addCase(checkoutBook.pending, (state) => {
      state.checkoutBookError = false;
      state.loadingLoan = true;
    });

    builder.addCase(checkinBook.pending, (state) => {
      state.checkinBookError = false;
      state.loadingLoan = true;
    });
    
    // Fulfilled logic
    builder.addCase(fetchAllBooks.fulfilled, (state, action) => {
      state.books = action.payload;
      state.loadingCatalog = false;
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
      state.loadingSearch = false
    });

    builder.addCase(checkoutBook.fulfilled, (state, action) => {
      const book = state.books.find(
        (b) => b._id === action.payload.item
      );

      if (book) {
        book.records = [action.payload, ...(book.records ?? [])];
      }

      state.loadingLoan = false;
    })

    builder.addCase(checkinBook.fulfilled, (state, action) => {
      const book = state.books.find(
        (b) => b._id === action.payload.item
      );

      if (book) {
        const records = book.records ?? [];

        const recordExists = records.some(
          (record) => record._id === action.payload._id
        );

        book.records = recordExists
          ? records.map((record) =>
              record._id === action.payload._id
                ? action.payload
                : record
            )
          : [action.payload, ...records];
      }

      state.loadingLoan = false;
    })

    // Rejected logic
    builder.addCase(fetchAllBooks.rejected, (state) => {
      state.catalogError = true;
      state.loadingCatalog = false;
    });
    
    builder.addCase(queryBooks.rejected, (state) => {
      state.searchError = true;
      state.loadingSearch = false;
    });
    
    builder.addCase(checkoutBook.rejected, (state) => {
      state.checkoutBookError = true;
      state.loadingLoan = false;
    });

    builder.addCase(checkinBook.rejected, (state) => {
      state.checkinBookError = true;
      state.loadingLoan = false;
    });
  }
});

export const { resetBookCheckoutError, setCurrentBook } = BookSlice.actions;
export default BookSlice.reducer;