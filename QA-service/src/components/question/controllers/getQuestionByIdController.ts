import { Request, Response } from 'express';
import { errorHandler } from '../../../utils/errorHandler';
import { constants as HTTP } from 'http2';
import { getQuestionById } from '../QuestionService';

/**
 * @swagger
 * /api/v1/questions/{id}:
 *   get:
 *     summary: Get a question by id
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The question id
 *     responses:
 *       200:
 *         description: The question was successfully found by the id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Question'
 *       404:
 *         description: The book was not found
 */
export const getQuestionByIdController = async (
  req: Request,
  res: Response
) => {
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
};
