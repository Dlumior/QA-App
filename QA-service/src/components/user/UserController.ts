import { Router, json, urlencoded, Request, Response } from 'express';
import { constants as HTTP } from 'http2';
import { errorHandler } from '../../utils/errorHandler';
import { authUser, createUser } from './UserService';

const userRouter = Router();

userRouter.use(urlencoded({ extended: true }));
userRouter.use(json());

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         id:
 *           type: number
 *           description: The auto-generated id of the user
 *         username:
 *           type: string
 *           description: The username of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *       example:
 *         id: 1
 *         username: bob
 *         password: 123
 */

userRouter.post('/signup', async (req: Request, res: Response) => {
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
});

userRouter.post('/signin', async (req: Request, res: Response) => {
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
});

export default userRouter;
