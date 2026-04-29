import { Types } from 'mongoose';

export type UserType = 'ADMIN' | 'EMPLOYEE' | 'PATRON';

export interface IUserBase {
  type: UserType;
  firstName: string;
  lastName: string;
  email: string;
}

export interface IUser extends IUserBase {
  _id: string;
}

export interface CreateIUser extends IUserBase {
  password: string;
}

export interface UpdateIUser extends IUserBase {
  _id: string;
  password?: string;
}

export interface IUserDb extends IUserBase {
  password: string;
}

export interface IUserDocument extends IUserBase {
  _id: Types.ObjectId;
  password: string;
}