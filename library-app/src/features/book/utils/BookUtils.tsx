import type { JSX } from 'react';
import type { Book } from '../../../models/Book';
import { BookCheckin } from '../components/BookCheckin/BookCheckin';
import { BookCheckout } from '../components/BookCheckout/BookCheckout';

export function determineLoanModalContent(book:Book):JSX.Element {
  const latestRecord = book.records && book.records.length > 0
    ? book.records.reduce((latest, current) => {
        return new Date(current.createdAt).getTime() >
          new Date(latest.createdAt).getTime()
          ? current
          : latest;
      })
    : undefined;

  if (!latestRecord || latestRecord.status === 'AVAILABLE') {
    return <BookCheckout />
  }

  return <BookCheckin />
}