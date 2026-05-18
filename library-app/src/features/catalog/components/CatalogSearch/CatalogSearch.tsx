import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import './CatalogSearch.css';
import type { AppDispatch, RootState } from '../../../../redux/ReduxStore';
import { queryBooks } from '../../../../redux/slices/BookSlice';
import { BookCard } from '../../../book';
import { CatalogAdvancedSearch } from '../CatalogAdvancedSearch/CatalogAdvancedSearch';
import { CatalogSearchPageNavigator } from '../CatalogSearchPageNavigator/CatalogSearchPageNavigator';

export const CatalogSearch:React.FC = () => {
  const bookState = useSelector((state:RootState) => state.book);
  const dispatch:AppDispatch = useDispatch();

  const location = useLocation();

  useEffect(() => {
    dispatch(queryBooks(location.search));
  }, [dispatch, location.search])

  return (
    <div className="catalog-search">
      <div className="catalog-search-advanced-search-section">
        <CatalogAdvancedSearch />
      </div>
      {bookState.loadingSearch ? 
        <div className="staging-screen">
          <h2>Searching books...</h2>
        </div>
        : 
        !bookState.books.length || bookState.searchError ? 
        <div className="staging-screen">
          <h2>No results found</h2>
        </div>
        : 
        <>
          <h2>Displaying {bookState.pagingInformation?.pageCount} books out of {bookState.pagingInformation?.totalCount}</h2>
          <div className="catalog-search-item-area">
            {bookState.books.map((book) => <BookCard key={book.barcode} book={book} />)}
          </div>
          <div className="catalog-search-pages">
            <CatalogSearchPageNavigator />
          </div>
        </>
      }
    </div>
  )
}