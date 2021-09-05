import { DataTypes, Model } from 'sequelize';
import db from '../../config/database.config';
import { IAnswer } from './Answer';

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
