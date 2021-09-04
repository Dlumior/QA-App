import express, { urlencoded, json as expressJSON } from "express";
import cors from "cors";

import db from "./config/database.config"
import answerRouter from "./controllers/AnswerController";
import questionRouter from "./controllers/QuestionController";
import userRouter from "./controllers/UserController";

(async () => {
  await db.sync({ force: false, logging: false });
  console.log("DB is ready");
  
  const app = express();
  app.use(cors({
    methods: ["GET", "POST", "DELETE", "PUT"]
  }))
  app.use(urlencoded({ extended: true }));
  app.use(expressJSON());

  app.listen(5000, () => {
    console.log(`Server listening on: ${5000}`);
  })

  app.use("/api/v1/user", userRouter);
  app.use("/api/v1/question", questionRouter);
  app.use("/api/v1/answer", answerRouter);
})();