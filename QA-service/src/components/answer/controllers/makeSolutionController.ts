import { Request, Response } from 'express';
import { constants as HTTP } from 'http2';
import { errorHandler } from '../../../utils/errorHandler';
import { makeAnswerTheSolution } from '../AnswerService';

/**
 * @swagger
 * /api/v1/answers/solution/{id}:
 *   post:
 *     summary: make an answer a solution of a question
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
 *         description: The answer was succesfully modified
 *         contens:
 *           application/json:
 *             schema:
 *               type: array
 *               $ref: '#/components/schemas/Answer'
 *       404:
 *         description: There is no answer with that id
 */
export const makeSolutionController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const answer = await makeAnswerTheSolution(id);
    return res.status(HTTP.HTTP_STATUS_OK).json({ answer: answer });
  } catch (error: any) {
    return res
      .status(HTTP.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .json(
        errorHandler(error.message, HTTP.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      );
  }
};
