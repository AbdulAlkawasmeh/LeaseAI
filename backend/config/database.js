require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false // Set to true to see SQL queries in logs
  }
);

sequelize.authenticate()
  .then(() => console.log('✅ Database connected!'))
  .catch(err => console.error('❌ DB Connection error:', err));

module.exports = sequelize;
