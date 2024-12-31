"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("flight_bookings", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      is_applied_code: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: 0,
      },
      code_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "promotions",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      status: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      is_applied_code: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: 0,
      },
      flight_id: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      flight_code: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      payment_id: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      from: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      },
      to: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable("flight_bookings");
  },
};
