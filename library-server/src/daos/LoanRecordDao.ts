import mongoose, { Schema } from 'mongoose';

const LoanRecordDefinition: Record<string, any> = {
  status: { type: String, required: true, enum: ['AVAILABLE', 'LOANED'] },
  loanedDate: { type: Date, required: true },
  dueDate: { type: Date, required: true },
  returnedDate: { type: Date, required: false },
  patron: { type: Schema.Types.ObjectId, required: true },
  employeeOut: { type: Schema.Types.ObjectId, required: true },
  employeeIn: { type: Schema.Types.ObjectId, required: false },
  item: { type: Schema.Types.ObjectId, required: true, ref: 'Book' }
};

const LoanRecordSchema = new Schema(LoanRecordDefinition, {
  timestamps: true,
  versionKey: false 
});

export const LoanRecordModel = mongoose.model('LoanRecord', LoanRecordSchema as any);