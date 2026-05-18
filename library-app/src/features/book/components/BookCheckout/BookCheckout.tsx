import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './BookCheckout.css';
import type { AppDispatch, RootState } from '../../../../redux/ReduxStore';
import { checkoutBook, resetBookCheckoutError, setCurrentBook } from '../../../../redux/slices/BookSlice';
import { setDisplayLoan } from '../../../../redux/slices/ModalSlice';

export const BookCheckout:React.FC = () => {
  const user = useSelector((state:RootState) => state.authentication.loggedInUser);
  const book = useSelector((state:RootState) => state.book.currentBook);

  const bookState = useSelector((state:RootState) => state.book);
  const dispatch:AppDispatch = useDispatch();

  const libraryCardRef = useRef<HTMLInputElement>(null);

  const checkout = async (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (book && user && libraryCardRef && libraryCardRef.current) {
      const result = await dispatch(checkoutBook({
        book,
        employee:user,
        libraryCard: libraryCardRef.current.value
      }))

      if (checkoutBook.fulfilled.match(result)) {
        dispatch(setCurrentBook(undefined));
        dispatch(setDisplayLoan(false));
      }
    }
  }

  useEffect(() => {
    return (() => {
      dispatch(resetBookCheckoutError());
    });
  }, [dispatch])

  return (
    <div className="book-checkout">
      {
        book && user &&
        <form className="book-checkout-form">
          <h3>Loan Book Titled: {book.title}</h3>
          <h4>Enter patrons Library Card: </h4>
          {bookState.checkoutBookError ? <p className="book-checkout-form-error">Invalid Library Card ID</p> : <></>}
          <input className="book-checkout-input" placeholder="Library Card ID" ref={libraryCardRef} />
          <h4>Checkout Employee ID: </h4>
          <input className="book-checkout-input" value={user._id} disabled />
          <button type="button" className="book-checkout-button" onClick={checkout}>Loan Book</button>
        </form>
      }
    </div>
  )
}