import { Request, Response } from 'express';
import { errorHandler } from '../../../utils/errorHandler';
import { constants as HTTP } from 'http2';
import { createQuestion } from '../QuestionService';
import { IQuestion } from '../Question';

/**
 * @swagger
 * /api/v1/questions/user/{userId}:
 *   post:
 *     summary: Create a new question that belongs to an specific user
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Question'
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
export const createQuestionController = async (req: Request, res: Response) => {
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
};
