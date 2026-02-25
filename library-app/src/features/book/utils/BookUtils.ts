import type { Book } from '../../../models/Book';

export function mapAuthorsToString(book:Book) {
  let authors = "";

  for(const author of book.authors) {
    authors += author;
    authors += ", ";
  }

  return authors.slice(0, authors.length-2);
}