"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("sectors", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      legId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "legs",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      origin: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      destination: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      time: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      },
      airlineName: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      airlineNumber: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("sectors");
  },
};
