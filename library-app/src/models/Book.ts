import type { LoanRecord } from './LoanRecord';
import type { User } from './User';

export type Book = {
  _id: string;
  barcode: string;
  cover: string;
  title: string;
  authors: string[];
  description: string;
  subjects: string[];
  publicationDate: string;
  publisher: string;
  pages: number;
  genre: string;
  records?: LoanRecord[];
}

export type CheckOutBookPayload = {
  book: Book;
  libraryCard: string;
  employee: User;
}

export type CheckInBookPayload = {
  book: Book;
  employee: User;
}