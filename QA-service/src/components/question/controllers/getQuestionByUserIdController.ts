import { Request, Response } from 'express';
import { errorHandler } from '../../../utils/errorHandler';
import { constants as HTTP } from 'http2';
import { getQuestionByUserId } from '../QuestionService';

/**
 * @swagger
 * /api/v1/questions/user/{userId}:
 *   get:
 *     summary: Get the question made by a user
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The questions were successfully found by the userId
 *         contens:
 *           application/json:
 *             schema:
 *               type: array
 *               $ref: '#/components/schemas/Question'
 *       404:
 *         description: The questions weren't found
 */
export const getQuestionByUserIdController = async (
  req: Request,
  res: Response
) => {
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
};
