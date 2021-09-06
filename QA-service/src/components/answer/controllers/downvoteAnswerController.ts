import { Request, Response } from 'express';
import { constants as HTTP } from 'http2';
import { errorHandler } from '../../../utils/errorHandler';
import { downvoteAnswer } from '../AnswerService';

export const downvoteAnswerController = async (req: Request, res: Response) => {
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
};
