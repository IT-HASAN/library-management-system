export type LoanRecord = {
  _id: string;
  status: 'LOANED' | 'AVAILABLE';
  loanedDate: Date;
  dueDate: Date;
  returnedDate: Date;
  patron: string;
  employeeOut: string;
  employeeIn?: string;
  item: string;
  createdAt: Date;
  updatedAt: Date;
}