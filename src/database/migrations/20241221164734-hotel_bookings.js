'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('hotel_bookings' , {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id : {
        type : Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model : 'users',
          key: 'id'
        },
        onUpdate : 'CASCADE',
        onDelete: 'CASCADE'
      },
      is_applied_code : {
        type : Sequelize.DataTypes.BOOLEAN,
        defaultValue: 0
      },
      code_id : {
        type : Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model : 'promotions',
          key: 'id'
        },
        onUpdate : 'CASCADE',
        onDelete: 'CASCADE'
      },
      status : {
        type : Sequelize.DataTypes.INTEGER,
        allowNull : false
      },
      is_applied_code : {
        type : Sequelize.DataTypes.BOOLEAN,
        defaultValue: 0
      },
      hotel_id : {
        type : Sequelize.DataTypes.STRING,
        allowNull: false
      },
      hotel_code : {
        type : Sequelize.DataTypes.STRING,
        allowNull: false
      },
      payment_id : {
        type : Sequelize.DataTypes.STRING,
        allowNull: false
      },
      from : {
        type : Sequelize.DataTypes.DATE,
        allowNull: false
      },
      to : {
        type : Sequelize.DataTypes.DATE,
        allowNull: false
      },

    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('hotel_bookings');
  }
};