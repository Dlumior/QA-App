import { Request, Response } from 'express';
import { constants as HTTP } from 'http2';
import { errorHandler } from '../../../utils/errorHandler';
import { downvoteAnswer } from '../AnswerService';

/**
 * @swagger
 * /api/v1/answers/downvote/{id}:
 *   post:
 *     summary: Downvote an answer
 *     tags: [Answers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The answer id
 *     responses:
 *       200:
 *         description: The downvote was successfully
 *         contens:
 *           application/json:
 *             schema:
 *               type: array
 *               $ref: '#/components/schemas/Answer'
 *       404:
 *         description: There is no answer with that id
 */
export const downvoteAnswerController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const newAnswer = await downvoteAnswer(id);
    if (newAnswer !== undefined) {
      return res.status(HTTP.HTTP_STATUS_OK).json({ answer: newAnswer });
    } else {
      return res.status(HTTP.HTTP_STATUS_NOT_FOUND).json({ answer: {} });
    }
  } catch (error: any) {
    return res
      .status(HTTP.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .json(
        errorHandler(error.message, HTTP.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      );
  }
};
