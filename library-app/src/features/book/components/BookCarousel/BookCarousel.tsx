import React, { useState } from 'react';

import './BookCarousel.css';
import type { Book } from '../../../../models/Book';
import { BookCard } from '../BookCard/BookCard';

interface BookCarouselProps {
  books: Book[];
}

export const BookCarousel:React.FC<BookCarouselProps> = ({books}) => {
  const [order, setOrder] = useState<Book[]>(books);

  const moveLeft = () => {
    const item = order[0];
    const reordered = order.slice(1, order.length);

    reordered.push(item);
    setOrder(reordered);
  }
  
  const moveRight = () => {
    const item = order[order.length -1];
    let reordered = order.slice(0, order.length -1);

    reordered = [item, ...reordered];
    setOrder(reordered);
  }

  return (
    <div className="book-carousel">
      <div className="book-carousel-left-button" onClick={moveLeft}>
        {`<`}
      </div>
      <div className="book-carousel-right-button" onClick={moveRight}>
        {`>`}
      </div>
      {order.map((item) => <BookCard key={item.barcode} book={item} />)}
    </div>
  )
}