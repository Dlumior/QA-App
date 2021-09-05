import { IUser } from './User';
import { UserInstance } from './UserInstance';
import bcrypt from 'bcrypt';

export const createUser = async (user: IUser): Promise<IUser> => {
  try {
    const userRecord = await UserInstance.create(user);
    return userRecord.get();
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const authUser = async (user: IUser): Promise<IUser | null> => {
  try {
    const userRecord = await UserInstance.findOne({
      where: { username: user.username },
    });

    if (userRecord !== null) {
      const hashedPassword = userRecord.get().password;
      const isValid = await bcrypt.compare(user.password, hashedPassword);
      if (isValid) {
        return userRecord.get();
      }
    }
    return null;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
