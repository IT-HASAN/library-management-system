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
          <p>Loading catalog...</p>
        </div>
        :
        bookState.catalogError ?
        <div className="staging-screen">
          <p>There was a problem loading catalog</p>
        </div>
        :
        <div className="catalog-overview">
          <h1 className="catalog-heading">Welcome to the library catalog</h1>
          <p>There are currently {bookState.books.length} books.</p><br />
          <p>Browse from the selected books below, or find a book using the Search Catalog bar above.</p>
          <br />
          {genres.map((genre) => {
            return <CatalogOverviewSection key={genre} books={getRandomBooksByGenre(genre, bookState.books)} label={genre} />
          })}
        </div>
      } 
    </>
  )
}