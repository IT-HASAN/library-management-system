export interface IUserBase {
  type: 'ADMIN' | 'EMPLOYEE' | 'PATRON';
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

export interface IUserDocument extends IUserBase {
  _id: string;
  password: string;
}