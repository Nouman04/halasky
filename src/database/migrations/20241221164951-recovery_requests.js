"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("recovery_requests", {
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
      status: {
        type: Sequelize.DataTypes.ENUM("0", "1", "2"),
        allowNull: false,
        defaultValue: "0",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("recovery_requests");
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_recovery_requests_status";'
    );
  },
};
