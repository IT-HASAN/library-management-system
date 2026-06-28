import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { CatalogOverview, CatalogSearch } from '../../features/catalog';
import type { AppDispatch, RootState } from '../../redux/ReduxStore';
import { fetchAllBooks } from '../../redux/slices/BookSlice';

export default function CatalogPage() {
  const dispatch:AppDispatch = useDispatch();
  const loadingCatalog = useSelector((state: RootState) => state.book.loadingCatalog);
  const location = useLocation();
  
  useEffect(() => {
    if (location.search === "") {
      dispatch(fetchAllBooks());
    }
  }, [dispatch, location.search]);
  
  return (
    <>
      {loadingCatalog ? (
        <div className="staging-screen">
          <p>Loading catalog...</p>
        </div>
      ) : (
        <div className="page">
          <div className="page-container">
            {
              location.search === "" ?
              <CatalogOverview /> :
              <CatalogSearch />
            }
          </div>
        </div>
      )}
    </>
  )
}