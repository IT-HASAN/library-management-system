import mongoose, { Schema } from 'mongoose';

import { ILibraryCard } from '../models/LibraryCard';

const LibraryCardSchema:Schema = new Schema(
  {
    user: {type: Schema.Types.ObjectId, required: true, unique: true, ref: "User"}
  }
);

const ILibraryCardDao = mongoose.model('LibraryCard', LibraryCardSchema as any);

export default ILibraryCardDao;