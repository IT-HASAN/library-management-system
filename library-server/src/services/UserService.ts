import bcrypt from 'bcrypt';

import { config } from '../config';

import UserDao from '../daos/UserDao';
import { IUser } from '../models/User';
import { UnableToSaveUserError, InvalidUsernameOrPasswordError, UserDoseNotExistError } from '../utils/CustomErrors';

export async function register(user:IUser):Promise<IUser>{
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
      email: result.email,
      password: result.password
    };
  } catch(error:any) {
    throw new UnableToSaveUserError(error.message);
  }
}

export async function login(credentials:{email:string, password:string}):Promise<IUser> {
  const {email, password} = credentials;

  try {
    const user = await UserDao.findOne({email}).lean<IUser>();

    if (!user) {
      throw new InvalidUsernameOrPasswordError("Invalid username or password");
    } else {
      const validPassword: boolean = await bcrypt.compare(password, user.password);

      if(validPassword) {
        return user;
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

export async function modifyUser(user:IUser):Promise<IUser> {
  try {
    const updatedUser = await UserDao.findByIdAndUpdate(user._id, user, {new: true}).lean<IUser>();
    
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