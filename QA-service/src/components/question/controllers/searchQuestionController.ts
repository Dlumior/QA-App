import { Request, Response } from 'express';
import { errorHandler } from '../../../utils/errorHandler';
import { constants as HTTP } from 'http2';
import { searchQuestion } from '../QuestionService';

/**
 * @swagger
 * /api/v1/questions/search/:
 *   post:
 *     summary: Search a question by a query
 *     tags: [Questions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *              query:
 *                description: phrase to search
 *                type: string
 *             required:
 *              - query
 *     responses:
 *       200:
 *         description: The question was successfully created
 *         contens:
 *           application/json:
 *             schema:
 *               type: array
 *               $ref: '#/components/schemas/Question'
 *       404:
 *         description: The questions weren't found
 */
export const searchQuestionController = async (req: Request, res: Response) => {
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
};
