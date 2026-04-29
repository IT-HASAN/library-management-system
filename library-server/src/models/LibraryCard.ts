import { Types } from 'mongoose';

export interface ILibraryCard {
  user: string;
}

export interface ILibraryCardDb {
  user: Types.ObjectId;
}

export interface ILibraryCardDocument extends ILibraryCardDb {
  _id: Types.ObjectId;
}