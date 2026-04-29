import { Types } from 'mongoose';

export type LoanRecordStatus = 'AVAILABLE' | 'LOANED'

export interface ILoanRecordBase {
  status: LoanRecordStatus;
  loanedDate: Date;
  dueDate: Date;
  returnedDate?: Date | null;
  patron: string;
  employeeOut: string;
  employeeIn?: string | null;
  item: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ILoanRecord extends ILoanRecordBase {
  _id: string;
}

export interface CreateILoanRecord extends ILoanRecordBase {}

export interface UpdateILoanRecord extends ILoanRecordBase {
  _id: string;
}

export interface ILoanRecordDb {
  status: LoanRecordStatus;
  loanedDate: Date;
  dueDate: Date;
  returnedDate?: Date | null;
  patron: Types.ObjectId;
  employeeOut: Types.ObjectId;
  employeeIn?: Types.ObjectId | null;
  item: Types.ObjectId;
}

export interface ILoanRecordDocument extends ILoanRecordDb {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}