require("dotenv").config();
const configuration = require("../config/config.json");
const { Sequelize } = require("sequelize");
const enviroment = process.env.NODE_ENV;
const connection = configuration[enviroment];
const sequelizer = new Sequelize(
  connection.database,
  connection.username,
  connection.password,
  {
    host: connection.host,
    dialect: connection.dialect,
  }
);

sequelizer
  .authenticate()
  .then(() => {
    console.log("Database connection created successfully");
  })
  .catch((err) => {
    console.log(`Database connection error: ${err}`);
  });

module.exports = { sequelizer };
