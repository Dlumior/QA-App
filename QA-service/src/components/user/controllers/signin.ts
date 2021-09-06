import { Request, Response } from 'express';
import userRouter from '../UserController';
import { authUser } from '../UserService';
import { constants as HTTP } from 'http2';
import { errorHandler } from '../../../utils/errorHandler';

export const signin = async (req: Request, res: Response) => {
  try {
    const userAuth = await authUser({
      username: req.body.username,
      password: req.body.password,
    });
    if (userAuth !== null) {
      return res.status(HTTP.HTTP_STATUS_OK).json({ user: userAuth });
    } else {
      return res.status(HTTP.HTTP_STATUS_NOT_FOUND).json({ user: {} });
    }
  } catch (error: any) {
    return res
      .status(HTTP.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .json(
        errorHandler(error.message, HTTP.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      );
  }
};
