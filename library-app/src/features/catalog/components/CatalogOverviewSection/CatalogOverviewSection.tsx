import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './CatalogOverviewSection.css';
import type { Book } from '../../../../models/Book';
import type { RootState } from '../../../../redux/ReduxStore';
import { BookCarousel } from '../../../book';

interface CatalogOverviewSectionProps {
  books: Book[];
  label: string;
}

export const CatalogOverviewSection:React.FC<CatalogOverviewSectionProps> = ({books, label}) => {
  const bookState = useSelector((state:RootState) => state.book);

  const navigate = useNavigate();

  const handleViewMore = () => {
    navigate(`/catalog?genre=${label}&subject=${label}`);
  }

  return (
    <div className="catalog-overview-section">
      <div className="catalog-overview-section-top">
        <h2>{label}</h2>
        <button type="button" className="catalog-overview-section-more" onClick={handleViewMore}>View more books</button>
      </div>
      {books.length > 0 && !bookState.loadingCatalog && <BookCarousel books={books} />}
    </div>
  )
}