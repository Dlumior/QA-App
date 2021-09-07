import { Request, Response } from 'express';
import { getAnswersByQuestionId } from '../AnswerService';
import { constants as HTTP } from 'http2';
import { errorHandler } from '../../../utils/errorHandler';

/**
 * @swagger
 * /api/v1/answers/{questionId}:
 *   get:
 *     summary: Get the answers of a question
 *     tags: [Answers]
 *     parameters:
 *       - in: path
 *         name: questionId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The question id
 *     responses:
 *       200:
 *         description: The answers were successfully found
 *         contens:
 *           application/json:
 *             schema:
 *               type: array
 *               $ref: '#/components/schemas/Answer'
 *       404:
 *         description: There were no answers
 */
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
