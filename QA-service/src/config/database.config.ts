import { Sequelize } from 'sequelize';

const db = new Sequelize('db_qa', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
});

export default db;
