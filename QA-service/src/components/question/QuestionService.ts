import { UserInstance } from 'components/user/UserInstance';
import { Op } from 'sequelize';
import { IQuestion } from './Question';
import { QuestionInstace } from './QuestionInstace';

export const getQuestions = async (): Promise<QuestionInstace[]> => {
  try {
    const questionRecords = await QuestionInstace.findAll({
      include: {
        model: UserInstance,
        attributes: ['username', 'createdAt', 'updatedAt'],
      },
    });
    return questionRecords;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getQuestionById = async (
  id: number
): Promise<IQuestion | null> => {
  try {
    const questionRecord = await QuestionInstace.findByPk(id, {
      include: {
        model: UserInstance,
        attributes: ['username', 'createdAt', 'updatedAt'],
      },
    });
    if (questionRecord) {
      return questionRecord.get();
    } else {
      return null;
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getQuestionByUserId = async (userId: number) => {
  try {
    const questionRecord = await QuestionInstace.findAll({
      where: { userId: userId },
    });
    return questionRecord;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const createQuestion = async (question: IQuestion) => {
  try {
    const questionRecord = await QuestionInstace.create(question);
    const newQuestion = questionRecord.get();
    return newQuestion;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const searchQuestion = async (query: string) => {
  try {
    const questionRecord = await QuestionInstace.findAll({
      where: {
        title: {
          [Op.substring]: query,
        },
      },
      include: {
        model: UserInstance,
        attributes: ['username', 'createdAt', 'updatedAt'],
      },
    });
    return questionRecord;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
