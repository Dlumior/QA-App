import { DataTypes, Model } from 'sequelize';
import db from '../../config/database.config';
import { AnswerInstance } from '../answer/AnswerInstance';
import { QuestionInstace } from '../question/QuestionInstace';
import bcrypt from 'bcrypt';
import { IUser } from './User';

export class UserInstance extends Model<IUser> {}

UserInstance.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: 'USERS',
    hooks: {
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(3);
        const hashedPassword = await bcrypt.hash(user.get().password, salt);
        user.set({ password: hashedPassword });
      },
    },
  }
);

UserInstance.hasMany(QuestionInstace, { foreignKey: 'userId' });
QuestionInstace.belongsTo(UserInstance, { foreignKey: 'userId' });

UserInstance.hasMany(AnswerInstance, { foreignKey: 'userId' });
AnswerInstance.belongsTo(UserInstance, { foreignKey: 'userId' });
