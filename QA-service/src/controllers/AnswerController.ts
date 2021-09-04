import { Router, json, urlencoded, Request, Response } from "express";
import { constants as HTTP } from "http2";
import { AnswerInstance } from "../model/AnswerInstance";
import { QuestionInstace } from "../model/QuestionInstace";
import { UserInstance } from "../model/UserInstance";
import { errorHandler } from "../utils/errorHandler";

const answerRouter = Router();

answerRouter.use(urlencoded({ extended: true }));
answerRouter.use(json());

answerRouter.get("/:questionId", async (req: Request, res: Response) => {
  try {
    const answerRecord = await AnswerInstance.findAll({
      where: {questionId: parseInt(req.params.questionId)},
      include: {
        model: UserInstance,
        attributes: ["username", "createdAt", "updatedAt"]
      }
    });
    return res
      .status(HTTP.HTTP_STATUS_OK)
      .json({ answer: answerRecord });
  } catch (error) {
    return res
      .status(HTTP.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .json(errorHandler(
        "Fail to list the answers of a question",
        error.message,
        HTTP.HTTP_STATUS_INTERNAL_SERVER_ERROR,
        `/api/answer/${req.params.questionId}`
      ));
  }
});

answerRouter.post("/:questionId", async (req: Request, res: Response) => {
  try {
    const answerRecord = await AnswerInstance.create({
      userId: parseInt(req.body.userId),
      questionId: parseInt(req.params.questionId),
      answer: req.body.answer,
      positiveRating: 0,
      negativeRating: 0
    });
    return res
      .status(HTTP.HTTP_STATUS_OK)
      .json({ answer: {...answerRecord.get()} });
  } catch (error) {
    return res
      .status(HTTP.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .json(errorHandler(
        "Fail to create the answer of a question",
        error.message,
        HTTP.HTTP_STATUS_INTERNAL_SERVER_ERROR,
        `/api/answer/${req.params.questionId}`
      ));
  }
});

answerRouter.post("/upvote/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const answerRecordInitial = await AnswerInstance.findByPk(id);
    const positiveRatingInitial =  answerRecordInitial? answerRecordInitial?.get().positiveRating: 0;
    const answerRecord = await AnswerInstance.update({
      positiveRating: positiveRatingInitial + 1,
    },{
      where: {id: parseInt(req.params.id)}
    });
    return res
      .status(HTTP.HTTP_STATUS_OK)
      .json({ answer: answerRecord });

  } catch (error) {
    return res
      .status(HTTP.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .json(errorHandler(
        "Fail to upvote the answer by id",
        error.message,
        HTTP.HTTP_STATUS_INTERNAL_SERVER_ERROR,
        `/api/answer/upvote/${req.params.id}`
      ))
  }
});

answerRouter.post("/downvote/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const answerRecordInitial = await AnswerInstance.findByPk(id);
    const negativeRatingInitial =  answerRecordInitial? answerRecordInitial?.get().negativeRating: 0;
    const answerRecord = await AnswerInstance.update({
      negativeRating: negativeRatingInitial + 1,
    },{
      where: {id: parseInt(req.params.id)}
    });
    return res
      .status(HTTP.HTTP_STATUS_OK)
      .json({ answer: answerRecord });

  } catch (error) {
    return res
      .status(HTTP.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .json(errorHandler(
        "Fail to downvote the answer by id",
        error.message,
        HTTP.HTTP_STATUS_INTERNAL_SERVER_ERROR,
        `/api/answer/downvote/${req.params.id}`
      ))
  }
});


export default answerRouter;