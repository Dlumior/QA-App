import { Router, json, urlencoded, Request, Response } from 'express';
import { constants as HTTP } from 'http2';
import { Op } from 'sequelize';
import { AnswerInstance } from '../model/AnswerInstance';
import { QuestionInstace } from '../model/QuestionInstace';
import { UserInstance } from '../model/UserInstance';
import { errorHandler } from '../utils/errorHandler';

const questionRouter = Router();

questionRouter.use(urlencoded({ extended: true }));
questionRouter.use(json());

questionRouter.get('/', async (req: Request, res: Response) => {
  try {
    const questionRecord = await QuestionInstace.findAll({
      include: {
        model: UserInstance,
        attributes: ['username', 'createdAt', 'updatedAt'],
      },
    });
    return res.status(HTTP.HTTP_STATUS_OK).json({ question: questionRecord });
  } catch (error) {
    return res
      .status(HTTP.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .json(
        errorHandler(
          'Fail to list the questions',
          error.message,
          HTTP.HTTP_STATUS_INTERNAL_SERVER_ERROR,
          '/api/question'
        )
      );
  }
});

questionRouter.get('/exact/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const questionRecord = await QuestionInstace.findByPk(id, {
      include: {
        all: true,
      },
    });
    return res.status(HTTP.HTTP_STATUS_OK).json({ question: questionRecord });
  } catch (error) {
    return res
      .status(HTTP.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .json(
        errorHandler(
          'Fail to list the questions by userId',
          error.message,
          HTTP.HTTP_STATUS_INTERNAL_SERVER_ERROR,
          `/api/question/${req.params.id}`
        )
      );
  }
});

questionRouter.get('/:userId', async (req: Request, res: Response) => {
  try {
    const questionRecord = await QuestionInstace.findAll({
      where: { userId: req.params.userId },
    });
    return res.status(HTTP.HTTP_STATUS_OK).json({ question: questionRecord });
  } catch (error) {
    return res
      .status(HTTP.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .json(
        errorHandler(
          'Fail to list the questions by userId',
          error.message,
          HTTP.HTTP_STATUS_INTERNAL_SERVER_ERROR,
          `/api/question/${req.params.id}`
        )
      );
  }
});

questionRouter.post('/:userId', async (req: Request, res: Response) => {
  try {
    const questionRecord = await QuestionInstace.create({
      userId: parseInt(req.params.userId),
      title: req.body.title,
      description: req.body.description,
      solved: false,
    });
    return res
      .status(HTTP.HTTP_STATUS_OK)
      .json({ question: { ...questionRecord?.get() } });
  } catch (error) {
    return res
      .status(HTTP.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .json(
        errorHandler(
          'Fail to create the question by a userId',
          error.message,
          HTTP.HTTP_STATUS_INTERNAL_SERVER_ERROR,
          `/api/question/${req.params.id}`
        )
      );
  }
});

questionRouter.post('/search', async (req: Request, res: Response) => {
  try {
    const questionRecord = await QuestionInstace.findAll({
      where: {
        title: {
          [Op.substring]: req.body.query,
        },
      },
      include: {
        model: UserInstance,
        attributes: ['username', 'createdAt', 'updatedAt'],
      },
    });
    return res.status(HTTP.HTTP_STATUS_OK).json({ question: questionRecord });
  } catch (error) {
    return res
      .status(HTTP.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .json(
        errorHandler(
          'Fail to find the question by a query',
          error.message,
          HTTP.HTTP_STATUS_INTERNAL_SERVER_ERROR,
          '/api/question'
        )
      );
  }
});

export default questionRouter;
