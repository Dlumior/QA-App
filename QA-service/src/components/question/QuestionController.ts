import { Router, json, urlencoded, Request, Response } from 'express';
import { constants as HTTP } from 'http2';
import { Op } from 'sequelize';
import { AnswerInstance } from '../answer/AnswerInstance';
import { QuestionInstace } from './QuestionInstace';
import { UserInstance } from '../user/UserInstance';
import { errorHandler } from '../../utils/errorHandler';
import {
  createQuestion,
  getQuestionById,
  getQuestionByUserId,
  getQuestions,
  searchQuestion,
} from './QuestionService';
import { IQuestion } from './Question';

const questionRouter = Router();

questionRouter.use(urlencoded({ extended: true }));
questionRouter.use(json());

/**
 * GET all the questions
 */
questionRouter.get('/', async (req: Request, res: Response) => {
  try {
    const questions = await getQuestions();
    return res.status(HTTP.HTTP_STATUS_OK).json({ question: questions });
  } catch (error: any) {
    return res
      .status(HTTP.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .json(
        errorHandler(error.message, HTTP.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      );
  }
});

/**
 * GET an specific question by his ID
 */
questionRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const question = await getQuestionById(id);
    return res.status(HTTP.HTTP_STATUS_OK).json({ question: question });
  } catch (error: any) {
    return res
      .status(HTTP.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .json(
        errorHandler(error.message, HTTP.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      );
  }
});

/**
 * GET the questions made by a user
 */
questionRouter.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const questions = await getQuestionByUserId(userId);
    return res.status(HTTP.HTTP_STATUS_OK).json({ question: questions });
  } catch (error: any) {
    return res
      .status(HTTP.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .json(
        errorHandler(error.message, HTTP.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      );
  }
});

/**
 * POST a question of an specific user
 */
questionRouter.post('/user/:userId', async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const question: IQuestion = {
      userId: userId,
      title: req.body.title,
      description: req.body.description,
      solved: false,
    };
    const newQuestion = await createQuestion(question);
    return res.status(HTTP.HTTP_STATUS_OK).json({ question: newQuestion });
  } catch (error: any) {
    return res
      .status(HTTP.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .json(
        errorHandler(error.message, HTTP.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      );
  }
});

/**
 * POST to search questions by his title
 */
questionRouter.post('/search', async (req: Request, res: Response) => {
  try {
    const query: string = req.body.query;
    const questions = await searchQuestion(query);
    return res.status(HTTP.HTTP_STATUS_OK).json({ question: questions });
  } catch (error: any) {
    return res
      .status(HTTP.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .json(
        errorHandler(error.message, HTTP.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      );
  }
});

export default questionRouter;
