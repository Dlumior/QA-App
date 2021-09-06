import { Request, Response } from 'express';
import { createAnswer } from '../AnswerService';
import { constants as HTTP } from 'http2';
import { errorHandler } from '../../../utils/errorHandler';
import { IAnswer } from '../Answer';

export const createAnswerController = async (req: Request, res: Response) => {
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
};
