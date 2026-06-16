import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../../redux/ReduxStore';
import './BookOfTheWeek.css';
import { BookInformation } from '../../../book';
import { fetchFeaturedBook } from '../../../../redux/slices/BookSlice';

export const BookOfTheWeek:React.FC = () => {
  const dispatch:AppDispatch = useDispatch(); 
  const {
    featuredBook,
    loadingFeaturedBook,
    featuredBookError
  } = useSelector((state:RootState) => state.book);

  useEffect(() => {
    dispatch(fetchFeaturedBook());
  }, [dispatch]);

  return (
    <div className="book-of-the-week">
      <h1>Book of the Week:</h1>
      {loadingFeaturedBook ? (
        <div className="staging-featured-book">
          <p>Loading this week's featured book...</p>
        </div>
      ) : featuredBookError ? (
        <div className="staging-featured-book">
          <p>Unable to load featured book.</p>
        </div>
      ) : featuredBook ? (
        <BookInformation book={featuredBook} />
      ) : (
        <div className="staging-featured-book">
          <p>No featured book available.</p>
        </div>
      )

      }
    </div>
  )
}