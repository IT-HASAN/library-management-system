import type { Book } from './Book';

export type LoanRecord = {
  _id: string;
  status: 'LOANED' | 'AVAILABLE';
  loanedDate: string;
  dueDate: string;
  returnedDate: string;
  patron: string;
  employeeOut: string;
  employeeIn?: string;
  item: string;
  createdAt: string;
  updatedAt: string;
}

export type LoanRecordPopulated = Omit<LoanRecord, 'item'> & {
  item: Book;
};