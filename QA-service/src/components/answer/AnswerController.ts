import { Router, json, urlencoded } from 'express';
import { getAnswersByQuestionIdController } from './controllers/getAnswersByQuestionIdController';
import { createAnswerController } from './controllers/createAnswerController';
import { upvoteAnswerController } from './controllers/upvoteAnswerController';
import { downvoteAnswerController } from './controllers/downvoteAnswerController';
import { makeSolutionController } from './controllers/makeSolutionController';

const answerRouter = Router();

answerRouter.use(urlencoded({ extended: true }));
answerRouter.use(json());

answerRouter.get('/:questionId', getAnswersByQuestionIdController);

answerRouter.post('/:questionId', createAnswerController);

answerRouter.post('/upvote/:id', upvoteAnswerController);

answerRouter.post('/downvote/:id', downvoteAnswerController);

answerRouter.post('/solution/:id', makeSolutionController);

export default answerRouter;
