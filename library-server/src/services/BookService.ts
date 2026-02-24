import BookDao from '../daos/BookDao';
import { IBook } from '../models/Book';
import { BookDoseNotExistError } from '../utils/CustomErrors';

export async function findAllBooks():Promise<IBook[]> {
  return await BookDao.find().lean<IBook[]>();
}

export async function modifyBook(book:IBook):Promise<IBook> {
  try {
    let id = await BookDao.findOneAndUpdate({barcode: book.barcode}, book, {new: true}).lean<IBook>();
    if (id) return book;

    throw new BookDoseNotExistError("The book you are trying to modify does not exist");
  } catch (error:any) {
    throw error;
  }
}

export async function registerBook(book:IBook):Promise<IBook> {
  const savedBook = new BookDao(book);
  return await savedBook.save();
}

export async function removeBook(barcode:string):Promise<string> {
  try {
    let id = await BookDao.findOneAndDelete({barcode});
    if (id) return "Successfully deleted book";

    throw new BookDoseNotExistError("The book you are trying to delete does not exist");
  } catch (error:any) {
    throw error;
  }
}