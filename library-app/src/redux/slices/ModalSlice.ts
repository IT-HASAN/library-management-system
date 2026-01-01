import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ModalSliceState {
  displayLogin: boolean;
  displayLibraryCard: boolean;
  displayLoan: boolean;
}

const initialState:ModalSliceState = {
  displayLogin: true,
  displayLibraryCard: false,
  displayLoan: false
}

export const ModalSlice = createSlice({
  name:'modal',
  initialState,
  reducers: {
    setDisplayLogin(state, action:PayloadAction<boolean>) {
      state.displayLogin = action.payload
    },
    setDisplayLibraryCard(state, action:PayloadAction<boolean>) {
      state.displayLibraryCard = action.payload
    },
    setDisplayLoan(state, action:PayloadAction<boolean>) {
      state.displayLoan = action.payload
    },
  }
});

export const { setDisplayLogin, setDisplayLibraryCard, setDisplayLoan } = ModalSlice.actions;

export default ModalSlice.reducer;