import { UserInstance } from '../user/UserInstance';
import { IAnswer } from './Answer';
import { AnswerInstance } from './AnswerInstance';

export const getAnswersByQuestionId = async (questionId: number) => {
  try {
    const answerRecords = await AnswerInstance.findAll({
      include: {
        model: UserInstance,
        attributes: ['username', 'createdAt', 'updatedAt'],
      },
      where: { questionId: questionId },
    });
    return answerRecords;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const createAnswer = async (answer: IAnswer) => {
  try {
    const answerRecord = await AnswerInstance.create(answer);
    const newAnswer = answerRecord.get();
    return newAnswer;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const upvoteAnswer = async (id: number) => {
  try {
    const answerRecord = await AnswerInstance.increment('upvotes', {
      by: 1,
      where: { id: id },
    });
    return answerRecord.get();
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const downvoteAnswer = async (id: number) => {
  try {
    const answerRecord = await AnswerInstance.increment('downvotes', {
      by: -1,
      where: { id: id },
    });
    return answerRecord.get();
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const makeAnswerTheSolution = async (id: number) => {
  try {
    const answerRecord = await AnswerInstance.update(
      { solution: true },
      {
        where: {
          id: id,
        },
      }
    );
    return answerRecord;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
