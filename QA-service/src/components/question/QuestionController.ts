import { Router, json, urlencoded, Request, Response } from 'express';
import { getAllQuestionsController } from './controllers/getAllQuestionsController';
import { getQuestionByIdController } from './controllers/getQuestionByIdController';
import { getQuestionByUserIdController } from './controllers/getQuestionByUserIdController';
import { createQuestionController } from './controllers/createQuestionController';
import { searchQuestionController } from './controllers/searchQuestionController';

const questionRouter = Router();

questionRouter.use(urlencoded({ extended: true }));
questionRouter.use(json());

/**
 * @swagger
 * components:
 *   schemas:
 *     Question:
 *       type: object
 *       required:
 *         - title
 *         - description
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the question
 *         title:
 *           type: string
 *           description: The title of the question
 *         description:
 *           type: string
 *           description: The description of the question
 *         solved:
 *           type: boolean
 *           description: Flag that indicate if the question was solved
 *         userId:
 *           type: integer
 *           description: The id of the user who made the question
 *       example:
 *         title: How to clean the console?
 *         description: I want to clean the console but I don't know how
 */

/**
 * @swagger
 * tags:
 *   name: Questions
 *   description: The questions managing API
 */

/**
 * GET all the questions
 */
questionRouter.get('/', getAllQuestionsController);

/**
 * GET an specific question by his ID
 */
questionRouter.get('/:id', getQuestionByIdController);

/**
 * GET the questions made by a user
 */
questionRouter.get('/user/:userId', getQuestionByUserIdController);

/**
 * POST a question of an specific user
 */
questionRouter.post('/user/:userId', createQuestionController);

/**
 * POST to search questions by his title
 */
questionRouter.post('/search', searchQuestionController);

export default questionRouter;
