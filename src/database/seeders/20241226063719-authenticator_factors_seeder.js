"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("authentication_factors", [
      {
        type: "google",
        is_applied: true,
      },
      {
        type: "facebook",
        is_applied: false,
      },
      {
        type: "email",
        is_applied: true,
      },
      {
        type: "phone",
        is_applied: true,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("authentication_factors", null, {});
  },
};
