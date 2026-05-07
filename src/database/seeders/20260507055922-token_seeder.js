"use strict";
require("dotenv").config();
const path = require("path");
const fs = require("fs");
const baseEncodePassword = require('../../Helpers/generateToken').baseEncodePassword;

const getSabreUrl = () => {
  return process.env.NODE_ENV === "production"
    ? process.env.SABRE_API_URL_PROD
    : process.env.SABRE_API_URL_DEV;
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const logFilePath = path.join(
      __dirname,
      "..",
      "storage",
      "seeder-logs.js"
    );

    const dir = path.dirname(logFilePath);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    try {
      const encodedPassword = baseEncodePassword( process.env.SABRE_PASSWORD );

      const endpoint = `${getSabreUrl()}/v2/auth/token`;

      const myHeaders = new Headers();

      myHeaders.append( "Authorization",  `Basic ${encodedPassword}`);

      myHeaders.append( "Content-Type", "application/x-www-form-urlencoded");

      const urlencoded = new URLSearchParams();

      urlencoded.append("grant_type", "client_credentials");

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };

      const response = await fetch(endpoint, requestOptions);

      const result = await response.json();

      const existingToken = await queryInterface.rawSelect(
        "json_handler",
        {
          where: {
            type: "sabreFlights",
          },
        },
        ["id"]
      );

      if (existingToken) {
        await queryInterface.bulkUpdate(
          "json_handler",
          {
            information: JSON.stringify(result),
            updated_at: new Date(),
          },
          {
            id: existingToken,
          }
        );

        const message = `[${new Date().toISOString()}] Authentication Token Updated\n`;

        fs.appendFileSync(logFilePath, message, "utf8");

        console.log("Sabre token updated successfully");
      } else {
        await queryInterface.bulkInsert("json_handler", [
          {
            type: "sabreFlights",
            information: JSON.stringify(result),
            created_at: new Date(),
            updated_at: new Date(),
          },
        ]);

        const message = `[${new Date().toISOString()}] Authentication Token Created\n`;

        fs.appendFileSync(logFilePath, message, "utf8");

        console.log("Sabre token created successfully");
      }
    } catch (error) {
      const errorMessage = `[${new Date().toISOString()}] ${
        error.stack || error
      }\n`;

      fs.appendFileSync(logFilePath, errorMessage, "utf8");

      console.error(error);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      "json_handler",
      {
        type: "sabreFlights",
      },
      {}
    );
  },
};