import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './BookCheckin.css';
import type { AppDispatch, RootState } from '../../../../redux/ReduxStore';
import { checkinBook, setCurrentBook } from '../../../../redux/slices/BookSlice';
import { setDisplayLoan } from '../../../../redux/slices/ModalSlice';

export const BookCheckin:React.FC = () => {
  const book = useSelector((state:RootState) => state.book.currentBook);
  const user = useSelector((state:RootState) => state.authentication.loggedInUser);

  const dispatch:AppDispatch = useDispatch();

  const checkin = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if(book && user) {
      dispatch(checkinBook({
        book,
        employee: user
      }))
      dispatch(setDisplayLoan(false));
      dispatch(setCurrentBook(undefined));
    }
  }

  return (
    <div className="book-checkin">
      {
        book && user && 
        <div className="book-checkin-form">
          <form className="book-checkin-form">
            <h2 className="book-checkin-title">Check In Book Titled:<br />{book.title}</h2>
            <div className="checkin-form-input-group">
              <label htmlFor="checkout-employee-id">Check In Employee ID:</label>
              <input 
                className="book-checkin-input" 
                value={user._id}
                name="checkout-employee-id"
                disabled 
              />
            </div>
            <button 
              type="button" 
              className="book-checkin-button" 
              onClick={checkin}
            >
              Return Book
            </button>
          </form>
        </div>
      }
    </div>
  )
}