import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './CatalogOverview.css';
import type { RootState } from '../../../../redux/ReduxStore';
import { generateRandomGenres, getRandomBooksByGenre } from '../../utils/CatalogUtils';
import { CatalogOverviewSection } from '../CatalogOverviewSection/CatalogOverviewSection';

export const CatalogOverview:React.FC = () => {
  const bookState = useSelector((state:RootState) => state.book);
  
  const [genres, setGenres] = useState<string[]>(() => {
    return generateRandomGenres();
  })

  return (
    <>
      {
        bookState.loadingCatalog ?
        <div className="staging-screen">
          <h2>Loading catalog...</h2>
        </div>
        :
        bookState.catalogError ?
        <div className="staging-screen">
          <h2>There was a problem loading catalog</h2>
        </div>
        :
        <div className="catalog-overview">
          <h2>Welcome to our library, we currently have {bookState.books.length} books.</h2>
          <h4>Browse our selected books below, or search for something using the top navigation bar.</h4>
          <br />
          {genres.map((genre) => {
            return <CatalogOverviewSection key={genre} books={getRandomBooksByGenre(genre, bookState.books)} label={genre} />
          })}
        </div>
      } 
    </>
  )
}