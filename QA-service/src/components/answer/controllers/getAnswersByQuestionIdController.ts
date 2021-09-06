import { Request, Response } from 'express';
import { getAnswersByQuestionId } from '../AnswerService';
import { constants as HTTP } from 'http2';
import { errorHandler } from '../../../utils/errorHandler';

export const getAnswersByQuestionIdController = async (
  req: Request,
  res: Response
) => {
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
};
