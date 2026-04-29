import mongoose, { Schema } from 'mongoose';

const UserDefinition: Record<string, any> = {
  type: { type: String, required: true, enum: ['ADMIN','EMPLOYEE','PATRON'] },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false }
};

const UserSchema = new Schema(UserDefinition, {
  versionKey: false
});

export const UserModel = mongoose.model('User', UserSchema as any);