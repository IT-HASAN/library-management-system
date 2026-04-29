import { ILoanRecord } from './LoanRecord';
import { Types } from 'mongoose';

export interface IBookBase {
  barcode: string;
  cover: string;
  title: string;
  authors: string[];
  description: string;
  subjects: string[];
  publicationDate: Date;
  publisher: string;
  pages: number;
  genre: string;
}

export interface IBook extends IBookBase {
  _id: string;
}

export interface UpdateIBook extends IBookBase {
  _id: string;
}

export interface IBookDb extends IBookBase {}

export interface IBookDocument extends IBookDb {
  _id: Types.ObjectId;
}

export interface IBookLoanRecords extends IBook {
  records: ILoanRecord[];
}