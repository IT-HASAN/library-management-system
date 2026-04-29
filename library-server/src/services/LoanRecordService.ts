import { LoanRecordModel } from '../daos/LoanRecordDao';
import { ILoanRecord, ILoanRecordDocument, CreateILoanRecord, UpdateILoanRecord } from '../models/LoanRecord';
import { LoanRecordDoesNotExistError } from '../utils/CustomErrors';

function loanRecordMap(doc: ILoanRecordDocument): ILoanRecord {
  return {
    _id: doc._id.toString(),
    status: doc.status,
    loanedDate: doc.loanedDate,
    dueDate: doc.dueDate,
    returnedDate: doc.returnedDate,
    patron: doc.patron.toString(),
    employeeOut: doc.employeeOut.toString(),
    employeeIn: doc.employeeIn?.toString(),
    item: doc.item.toString(),
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt
  };
}

function queryRecordMap(r: ILoanRecordDocument): ILoanRecord {
  return {
    ...r,
    _id: r._id.toString(),
    patron: r.patron.toString(),
    employeeOut: r.employeeOut.toString(),
    employeeIn: r.employeeIn?.toString(),
    item: r.item.toString()
  };
}

export async function generateRecord(record:CreateILoanRecord): Promise<ILoanRecord> {
  const createdRecord = new LoanRecordModel(record);
  const saved = await createdRecord.save();
  
  return loanRecordMap(saved);
}

export async function modifyRecord(record:UpdateILoanRecord): Promise<ILoanRecord> {
  const updatedRecord = await LoanRecordModel
    .findByIdAndUpdate(record._id, record, { new: true })
    .lean<ILoanRecord>();

  if (!updatedRecord) {
    throw new LoanRecordDoesNotExistError("The record does not exist");
  }

  return updatedRecord;
}

export async function findAllRecords(): Promise<ILoanRecord[]> {
  try {
    return await LoanRecordModel.find();
  } catch (error) {
    throw error;
  }
}

export async function queryRecords(params:{property:string, value:string | Date}): Promise<ILoanRecord[]> {
  const records = await LoanRecordModel
    .find({[params.property]: params.value})
    .lean<ILoanRecordDocument[]>()
    .sort("-loanedDate");

  return records.map(queryRecordMap);
}