import { Router, json, urlencoded, Request, Response } from 'express';
import { constants as HTTP } from 'http2';
import { errorHandler } from '../../utils/errorHandler';
import {
  createAnswer,
  downvoteAnswer,
  getAnswersByQuestionId,
  makeAnswerTheSolution,
  upvoteAnswer,
} from './AnswerService';
import { IAnswer } from './Answer';

const answerRouter = Router();

answerRouter.use(urlencoded({ extended: true }));
answerRouter.use(json());

answerRouter.get('/:questionId', async (req: Request, res: Response) => {
  try {
    const questionId = parseInt(req.params.questionId);
    const answers = await getAnswersByQuestionId(questionId);
    return res.status(HTTP.HTTP_STATUS_OK).json({ answer: answers });
  } catch (error: any) {
    return res
      .status(HTTP.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .json(
        errorHandler(error.message, HTTP.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      );
  }
});

answerRouter.post('/:questionId', async (req: Request, res: Response) => {
  try {
    const answer: IAnswer = {
      userId: parseInt(req.body.userId),
      questionId: parseInt(req.params.questionId),
      answer: req.body.answer,
      upvotes: 0,
      downvotes: 0,
      solution: false,
    };
    const newAnswer = await createAnswer(answer);
    return res.status(HTTP.HTTP_STATUS_OK).json({ answer: newAnswer });
  } catch (error: any) {
    return res
      .status(HTTP.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .json(
        errorHandler(error.message, HTTP.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      );
  }
});

answerRouter.post('/upvote/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const newAnswer = await upvoteAnswer(id);
    return res.status(HTTP.HTTP_STATUS_OK).json({ answer: newAnswer });
  } catch (error: any) {
    return res
      .status(HTTP.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .json(
        errorHandler(error.message, HTTP.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      );
  }
});

answerRouter.post('/downvote/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const newAnswer = await downvoteAnswer(id);
    return res.status(HTTP.HTTP_STATUS_OK).json({ answer: newAnswer });
  } catch (error: any) {
    return res
      .status(HTTP.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .json(
        errorHandler(error.message, HTTP.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      );
  }
});

answerRouter.post('/solution/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const answer = await makeAnswerTheSolution(id);
    return res.status(HTTP.HTTP_STATUS_OK).json({ answer: answer });
  } catch (error: any) {
    return res
      .status(HTTP.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .json(
        errorHandler(error.message, HTTP.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      );
  }
});

export default answerRouter;
