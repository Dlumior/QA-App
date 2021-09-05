import './config/env.config';
import express, { urlencoded, json as expressJSON } from 'express';
import cors from 'cors';

import db from './config/database.config';
import answerRouter from './components/answer/AnswerController';
import questionRouter from './components/question/QuestionController';
import userRouter from './components/user/UserController';

(async () => {
  await db.sync({ force: false, logging: false });
  console.log('DB is ready');

  const app = express();
  app.use(cors({ methods: ['GET', 'POST', 'DELETE', 'PUT'] }));
  app.use(urlencoded({ extended: true }));
  app.use(expressJSON());

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server listening on: ${PORT}`);
  });

  app.use('/api/v1/users', userRouter);
  app.use('/api/v1/questions', questionRouter);
  app.use('/api/v1/answers', answerRouter);
})();
