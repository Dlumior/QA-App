import { DataTypes, Model } from 'sequelize';
import db from '../../config/database.config';
import { AnswerInstance } from '../answer/AnswerInstance';
import { IQuestion } from './Question';

export class QuestionInstace extends Model<IQuestion> {}

QuestionInstace.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    solved: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  { sequelize: db, tableName: 'QUESTIONS' }
);

QuestionInstace.hasMany(AnswerInstance, { foreignKey: 'questionId' });
AnswerInstance.belongsTo(QuestionInstace, { foreignKey: 'questionId' });
