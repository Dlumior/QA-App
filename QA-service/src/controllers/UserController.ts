import { Router, json, urlencoded, Request, Response } from "express";
import bcrypt from "bcrypt";
import { constants as HTTP } from "http2";
import { UserInstance } from "../model/UserInstance";
import { errorHandler } from "../utils/errorHandler";

const userRouter = Router();

userRouter.use(urlencoded({ extended: true }));
userRouter.use(json());

userRouter.post("/signup", async (req: Request, res: Response) => {
  try {
    const userRecord = await UserInstance.create({
      username: req.body.username,
      password: req.body.password
    });
    return res
      .status(HTTP.HTTP_STATUS_OK)
      .json({ user: { ...userRecord.get() } });
  } catch (error) {
    return res
      .status(HTTP.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .json(errorHandler(
        "Fail to create the user",
        error.message,
        HTTP.HTTP_STATUS_INTERNAL_SERVER_ERROR,
        "/api/user/signup"
      ))
  }
});

userRouter.post("/signin", async (req: Request, res: Response) => {
  try {
    const userRecord = await UserInstance.findOne({
      where: { username: req.body.username }
    });
    if (userRecord !== null) {
      const hashedPassword = userRecord?.get().password;
      const isValid = await bcrypt.compare(req.body.password, hashedPassword);
      console.log(isValid);
      if (isValid) {
        return res
          .status(HTTP.HTTP_STATUS_OK)
          .json({ user: { ...userRecord?.get() } });
      } else {
        throw new Error("Wrong password");
      }
    }  else {
      throw new Error("Wrong username");
    } 
  } catch (error) {
    return res
      .status(HTTP.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .json(errorHandler(
        "Fail to signin the user",
        error.message,
        HTTP.HTTP_STATUS_INTERNAL_SERVER_ERROR,
        "/api/user/signin"
      ))
  }
});

export default userRouter;