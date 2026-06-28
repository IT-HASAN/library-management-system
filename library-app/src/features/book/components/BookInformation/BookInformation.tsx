import React from 'react';
import './BookInformation.css';
import type { Book } from '../../../../models/Book';

interface BookInfoProps {
  book: Book;
}

export const BookInformation:React.FC<BookInfoProps> = ({book}) => {
  return (
    <div className="book-info">
      <div className="book-info-container">
        <img className="book-info-cover" src={book.cover} />
        <div>
          <h2>{book.title}</h2>
          <h3>{book.authors.join(', ')}</h3>
          <p>{book.description}</p>
        </div>
      </div>
    </div>
  )
}