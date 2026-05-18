import { BookModel } from '../daos/BookDao';
import { IBookBase, IBook, UpdateIBook, IBookDocument, IBookLoanRecords } from '../models/Book';
import { BookDoesNotExistError } from '../utils/CustomErrors';
import { IPagination } from '../models/Pagination';

function bookMap(doc: IBookDocument): IBook {
  return {
    _id: doc._id.toString(),
    barcode: doc.barcode,
    cover: doc.cover,
    title: doc.title,
    authors: doc.authors,
    description: doc.description,
    subjects: doc.subjects,
    publicationDate: doc.publicationDate,
    publisher: doc.publisher,
    pages: doc.pages,
    genre: doc.genre
  };
}

export async function findAllBooks():Promise<IBookLoanRecords[]> {
  const books = await BookModel
    .find()
    .populate({
      path:'records',
      options: {
        sort: { createdAt: -1 }
      }
    })
    .lean({ virtuals: true });

  return books as unknown as IBookLoanRecords[];
}

export async function findBookById(id:string):Promise<IBookLoanRecords> {
  const book = await BookModel
    .findById(id)
    .populate({
      path: 'records',
      options: {
        sort: { createdAt: -1 }
      }
    })
    .lean({ virtuals: true });

  if (!book) {
    throw new BookDoesNotExistError("The specified book does not exist");
  }

  return book as unknown as IBookLoanRecords;
}

export async function modifyBook(book:UpdateIBook):Promise<IBook> {
  const updatedBook = await BookModel
    .findByIdAndUpdate(book._id, book, { new: true })
    .lean<IBook>();

  if (!updatedBook) {
    throw new BookDoesNotExistError("The book you are trying to modify does not exist");
  }

  return updatedBook;
}

export async function registerBook(book:IBookBase):Promise<IBook> {
  const savedBook = new BookModel(book);
  const saved = await savedBook.save();

  return bookMap(saved);
}

export async function removeBook(barcode:string):Promise<string> {
  try {
    let id = await BookModel.findOneAndDelete({barcode});
    if (id) return "Successfully deleted book";

    throw new BookDoesNotExistError("The book you are trying to delete does not exist");
  } catch (error:any) {
    throw error;
  }
}

export async function queryBooks(
  page:number,
  limit:number,
  title?:string,
  barcode?:string,
  description?:string,
  author?:string,
  subject?:string,
  genre?:string
): Promise<IPagination<IBookLoanRecords>> {
  const books = await BookModel
    .find()
    .populate({
      path: 'records',
      options: {
        sort: { createdAt: -1 }
      }
    })
    .lean<IBookLoanRecords[]>({ virtuals: true });

  const filteredBooks = books.filter((book) => {

    if (
      barcode &&
      book.barcode.toLowerCase().includes(barcode.toLowerCase())
    ) {
      return true;
    }

    if (
      title &&
      book.title.toLowerCase().includes(title.toLowerCase())
    ) {
      return true;
    }

    if (
      description &&
      book.description.toLowerCase().includes(description.toLowerCase())
    ) {
      return true;
    }

    if (
      author &&
      book.authors.some(a =>
        a.toLowerCase().includes(author.toLowerCase())
      )
    ) {
      return true;
    }

    if (
      subject &&
      book.subjects.some(s =>
        s.toLowerCase().includes(subject.toLowerCase())
      )
    ) {
      return true;
    }

    if (
      genre &&
      book.genre.toLowerCase() === genre.toLowerCase()
    ) {
      return true;
    }

    return false;
  });

  return paginateBook(filteredBooks, page, limit);
}

export function paginateBook(books: IBookLoanRecords[], page:number, limit:number): IPagination<IBookLoanRecords> {
  let pageBooks:IBookLoanRecords[] = [];

  const pages = Math.ceil(books.length / Number(limit));

  if (Number(page) === pages) {
    const startPoint = (Number(page) - 1) * Number(limit);
    pageBooks = books.slice(startPoint);
  } else {
    const startPoint = (Number(page) - 1) * Number(limit);
    const endPoint = startPoint + Number(limit);
    pageBooks = books.slice(startPoint, endPoint);
  }

  const pageObject = {
    totalCount: books.length,
    currentPage: Number(page),
    totalPages: pages,
    limit: Number(limit),
    pageCount: pageBooks.length,
    items: pageBooks
  }

  return pageObject;
}