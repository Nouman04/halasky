"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("passengers", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      flightId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "flights",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      type: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      total: {
        type: Sequelize.DataTypes.FLOAT,
        allowNull: false,
      },
      flightPnrResponse: {
        type: Sequelize.DataTypes.JSON,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("passengers");
  },
};
