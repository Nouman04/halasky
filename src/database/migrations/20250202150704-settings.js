"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("settings", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      primary_color: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      secondary_color: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      third_color: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      fourth_color: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      fifth_color: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      primary_font: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      secondary_font: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable("settings");
  },
};
