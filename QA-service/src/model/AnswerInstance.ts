import { DataTypes, Model } from 'sequelize';
import db from '../config/database.config';
import { QuestionInstace } from './QuestionInstace';
import { UserInstance } from './UserInstance';

interface IAnswer {
  id?: Number;
  answer: string;
  positiveRating: number;
  negativeRating: number;
  userId?: Number;
  questionId?: Number;
}

export class AnswerInstance extends Model<IAnswer> {}

AnswerInstance.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    positiveRating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    negativeRating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  { sequelize: db, tableName: 'ANSWERS' }
);
