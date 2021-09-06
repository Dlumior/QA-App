import { Request, Response } from 'express';
import { constants as HTTP } from 'http2';
import { errorHandler } from '../../../utils/errorHandler';
import { createUser } from '../UserService';

export const signup = async (req: Request, res: Response) => {
  try {
    const newUser = await createUser({
      username: req.body.username,
      password: req.body.password,
    });
    return res.status(HTTP.HTTP_STATUS_OK).json({ user: newUser });
  } catch (error: any) {
    return res
      .status(HTTP.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .json(
        errorHandler(error.message, HTTP.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      );
  }
};
