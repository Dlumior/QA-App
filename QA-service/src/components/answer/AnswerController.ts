import { Router, json, urlencoded } from 'express';
import { getAnswersByQuestionIdController } from './controllers/getAnswersByQuestionIdController';
import { createAnswerController } from './controllers/createAnswerController';
import { upvoteAnswerController } from './controllers/upvoteAnswerController';
import { downvoteAnswerController } from './controllers/downvoteAnswerController';
import { makeSolutionController } from './controllers/makeSolutionController';

const answerRouter = Router();

answerRouter.use(urlencoded({ extended: true }));
answerRouter.use(json());

/**
 * @swagger
 * components:
 *   schemas:
 *     Answer:
 *       type: object
 *       required:
 *         - answer
 *         - userId
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the answer
 *         answer:
 *           type: string
 *           description: The answer of a question
 *         upvotes:
 *           type: integer
 *           description: The number of upvotes of the answer
 *         downvotes:
 *           type: integer
 *           description: The number of downvotes of the answer
 *         solution:
 *           type: boolean
 *           description: Flag that indicate if the answer is the solution of the question
 *         userId:
 *           type: integer
 *           description: The id of the user who made the answer
 *         questionId:
 *           type: integer
 *           description: The id of the question being answered
 *       example:
 *         userId: 1
 *         answer: Some random answer
 */

/**
 * @swagger
 * tags:
 *   name: Answers
 *   description: The answers managing API
 */

answerRouter.get('/:questionId', getAnswersByQuestionIdController);

answerRouter.post('/:questionId', createAnswerController);

answerRouter.post('/upvote/:id', upvoteAnswerController);

answerRouter.post('/downvote/:id', downvoteAnswerController);

answerRouter.post('/solution/:id', makeSolutionController);

export default answerRouter;
