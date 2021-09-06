import { Request, Response } from 'express';
import { errorHandler } from '../../../utils/errorHandler';
import { getQuestions } from '../QuestionService';
import { constants as HTTP } from 'http2';

/**
 * @swagger
 * /api/v1/questions/:
 *   get:
 *     summary: Returns the list of all the questions
 *     tags: [Questions]
 *     responses:
 *       200:
 *         description: The list of the questions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Question'
 */
export const getAllQuestionsController = async (
  req: Request,
  res: Response
) => {
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
};
