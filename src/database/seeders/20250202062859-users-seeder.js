"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        name: "John Doe",
        number: "1234567890",
        email: "johndoe@example.com",
        is_platform_logged: false,
        platform_type: null,
        platform_image: "",
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Jane Smith",
        number: "0987654321",
        email: "janesmith@example.com",
        is_platform_logged: true,
        platform_type: "google",
        platform_image: "https://example.com/jane.jpg",
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Michael Brown",
        number: "1122334455",
        email: "michaelbrown@example.com",
        is_platform_logged: true,
        platform_type: "facebook",
        platform_image: "https://example.com/michael.jpg",
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
