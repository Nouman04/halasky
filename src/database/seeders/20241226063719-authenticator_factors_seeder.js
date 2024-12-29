"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("authentication_factors", [
      {
        type: "2FA",
        is_applied: false,
      },
      {
        type: "2FA_SMS",
        is_applied: false,
      },
      {
        type: "2FA_Email",
        is_applied: false,
      },
      {
        type: "2FA_Authenticator_App",
        is_applied: false,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("authentication_factors", null, {});
  },
};
