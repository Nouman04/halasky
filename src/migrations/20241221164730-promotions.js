'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('promotions' , {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      created_by : {
        type : Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model : 'users',
          key: 'id'
        },
        onUpdate : 'CASCADE',
        onDelete: 'CASCADE'
      },
      promotion_type :{
        type : Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      code : {
        type : Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      percentage : {
        type : Sequelize.DataTypes.FLOAT,
        allowNull: false
      },
      applicable_from: {
        type : Sequelize.DataTypes.DATEONLY,
        allowNull: false
      },
      applicable_to : {
        type : Sequelize.DataTypes.DATEONLY,
        allowNull: false
      },
      condition: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true
      },
      amount: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true
      }
      
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('promotions');
  }
};
