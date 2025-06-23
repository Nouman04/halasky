"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("promotions", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      created_by: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      promotion_name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      applicable_service: {
        type: Sequelize.DataTypes.ENUM('flight' , 'hotel' , 'both'),
        allowNull: false,
      },
      promotion_type: {
        type: Sequelize.DataTypes.ENUM('Fixed' , 'percentage'),
        allowNull: false,
      },
      code: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      percentage: {
        type: Sequelize.DataTypes.FLOAT,
        allowNull: true,
      },
      fixed_amount: {
        type: Sequelize.DataTypes.FLOAT,
        allowNull: true,
      },
      applicable_from: {
        type: Sequelize.DataTypes.DATEONLY,
        allowNull: false,
      },
      applicable_to: {
        type: Sequelize.DataTypes.DATEONLY,
        allowNull: false,
      },
      condition: {
        type: Sequelize.DataTypes.ENUM('minimum' , 'none'),
        allowNull: false,
      },
      amount: {
        type: Sequelize.DataTypes.DOUBLE(8, 2),
        allowNull: true,
        defaultValue: 0.0,
      },
      total_promo : {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false, 
      },
      used_promo: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
      },
      created_at : {
        type : Sequelize.DATE,
        allowNull : false,
        defaultValue : Sequelize.fn('NOW')
      },
      updated_at : {
        type : Sequelize.DATE,
        allowNull : false,
        defaultValue : Sequelize.fn('NOW')
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable("promotions");
  },
};
