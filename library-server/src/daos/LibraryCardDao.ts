import mongoose, { Schema } from 'mongoose';

const LibraryCardDefinition: Record<string, any> = {
  user: { type: Schema.Types.ObjectId, required: true, unique: true, ref: 'User' }
};

const LibraryCardSchema = new Schema(LibraryCardDefinition, {
  versionKey: false
});

export const LibraryCardModel = mongoose.model('LibraryCard', LibraryCardSchema as any);