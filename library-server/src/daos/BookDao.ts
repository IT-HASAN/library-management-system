import mongoose, { Schema } from 'mongoose';

const BookDefinition: Record<string, any> = {
  barcode: { type: String, required: true, unique: true },
  cover: { type: String, required: true },
  title: { type: String, required: true, unique: true },
  authors: { type: [String], required: true },
  description: { type: String, required: true },
  subjects: { type: [String], required: true },
  publicationDate: { type: Date, required: true },
  publisher: { type: String, required: true },
  pages: { type: Number, required: true },
  genre: { type: String, required: true },
};

const BookSchema = new Schema(BookDefinition, {
  versionKey: false,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

BookSchema.virtual('records', {
  ref: 'LoanRecord',
  localField: '_id',
  foreignField: 'item'
});

export const BookModel = mongoose.model('Book', BookSchema as any);