import './config/env.config';
import express, { urlencoded, json as expressJSON } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

import db from './config/database.config';
import answerRouter from './components/answer/AnswerController';
import questionRouter from './components/question/QuestionController';
import userRouter from './components/user/UserController';

(async () => {
  await db.sync({ force: false, logging: false });
  console.log('DB is ready');

  const PORT = process.env.PORT || 4000;
  const options: swaggerJSDoc.Options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'QA-API',
        version: '1.0.0',
        description: 'Simple question and answer API',
      },
      servers: [{ url: `http://localhost:${PORT}` }],
    },
    apis:
      process.env.NODE_ENV === 'prod'
        ? [`${__dirname}/components/**/*.js`]
        : [`${__dirname}/components/**/*.ts`],
  };
  console.log(`${__dirname}/components/UserController.ts`);

  const specs = swaggerJSDoc(options);

  const app = express();
  app.use(cors({ methods: ['GET', 'POST', 'DELETE', 'PUT'] }));
  app.use(urlencoded({ extended: true }));
  app.use(expressJSON());

  app.listen(PORT, () => {
    console.log(`Server listening on: ${PORT}`);
  });

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  app.use('/api/v1/users', userRouter);
  app.use('/api/v1/questions', questionRouter);
  app.use('/api/v1/answers', answerRouter);
})();
