"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("flights", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      flightNumber: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      airline: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      departureTime: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      },
      arrivalTime: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("flights");
  },
};
