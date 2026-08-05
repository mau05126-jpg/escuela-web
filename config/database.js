const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: { require: true, rejectUnauthorized: false },
    clientMinMessages: 'ignore'
  },
  dialectModule: require('pg'),
  logging: false
});

module.exports = sequelize;

