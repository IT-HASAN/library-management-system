import bcrypt from 'bcrypt';

import { config } from '../config';

import UserDao from '../daos/UserDao';
import { IUser, CreateIUser, UpdateIUser, IUserDocument } from '../models/User';
import { UnableToSaveUserError, InvalidUsernameOrPasswordError, UserDoseNotExistError } from '../utils/CustomErrors';

export async function register(user:CreateIUser):Promise<IUser>{
  const ROUNDS = config.server.rounds;

  try {
    const hashedPassword = await bcrypt.hash(user.password, ROUNDS);

    const saved = new UserDao({...user, password:hashedPassword});

    const result = await saved.save();

    return {
      _id: result._id.toString(),
      type: result.type,
      firstName: result.firstName,
      lastName: result.lastName,
      email: result.email
    };
  } catch(error:any) {
    throw new UnableToSaveUserError(error.message);
  }
}

export async function login(credentials:{email:string, password:string}):Promise<IUser> {
  const {email, password} = credentials;

  try {
    const user = await UserDao.findOne({email}).select('+password').lean<IUserDocument>();

    if (!user) {
      throw new InvalidUsernameOrPasswordError("Invalid username or password");
    } else {
      const validPassword: boolean = await bcrypt.compare(password, user.password);

      if(validPassword) {
        return {
          _id: user._id,
          type: user.type,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        };
      } else {
        throw new InvalidUsernameOrPasswordError("Invalid username or password");
      }
    }
  } catch (error:any) {
    throw error;
  }
}

export async function findAllUsers():Promise<IUser[]> {
  try {
    return await UserDao.find().lean<IUser[]>();
  } catch (error) {
    return [];
  }
}

export async function findUserById(userId:string):Promise<IUser> {
  try {
    const foundUser = await UserDao.findById(userId).lean<IUser>();
    
    if(!foundUser) {
      throw new UserDoseNotExistError("User does not exist with this ID");
    }

    return foundUser;
  } catch (error:any) {
    throw error;
  }
}

export async function modifyUser(user:UpdateIUser):Promise<IUser> {
  try {
    const { _id, ...updateData } = user;

    if (updateData.password) {
      updateData.password = await bcrypt.hash(
        updateData.password,
        config.server.rounds
      );
    }

    const updatedUser = await UserDao.findByIdAndUpdate(_id, updateData, {new: true}).lean<IUser>();
    
    if (!updatedUser) {
      throw new UserDoseNotExistError("User does not exist with this ID");
    }

    return updatedUser;
  } catch (error:any) {
      throw error;
  }
}

export async function removeUser(userId:string):Promise<string> {
  try {
    const deletedUser = await UserDao.findByIdAndDelete(userId);

    if (!deletedUser) {
      throw new UserDoseNotExistError("User does not exist with this ID");
    }

    return "User deleted successfully";
  } catch (error) {
    throw error;
  }
}