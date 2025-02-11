"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("about_content", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      upper_content: {
        type: Sequelize.DataTypes.TEXT("long"),
        allowNull: false,
      },
      lower_content: {
        type: Sequelize.DataTypes.TEXT("long"),
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable("about_content");
  },
};
