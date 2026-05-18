import { Types } from 'mongoose';

export interface ILibraryCardBase {
  user: string;
}

export interface ILibraryCard extends ILibraryCardBase {
  _id: string;
}

export interface ILibraryCardDb extends ILibraryCardBase {}

export interface ILibraryCardDocument extends ILibraryCardDb {
  _id: Types.ObjectId;
}