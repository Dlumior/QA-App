import { Sequelize } from 'sequelize';

if (!process.env.DB_USER) {
  throw new Error('There is no user in the env file');
}
if (!process.env.DB_PASS) {
  throw new Error('There is no password in the env file');
}

const db = new Sequelize(
  process.env.DB_SCHEMA ? process.env.DB_SCHEMA : 'DB_QA',
  process.env.DB_USER ? process.env.DB_USER : 'user',
  process.env.DB_PASS ? process.env.DB_PASS : 'pass',
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
  }
);

export default db;
