import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema (
  {
    type: { type: String, required: true, enum: ['ADMIN', 'EMPLOYEE', 'PATRON'] },
    firstName: {type:String, required:true},
    lastName: {type:String, required:true},
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true}
  },
  {
    versionKey: false
  }
);

const UserDao = mongoose.model('User', UserSchema as any);

export default UserDao;