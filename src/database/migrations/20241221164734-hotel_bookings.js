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
        allowNull: true,
        references: {
          model : 'promotions',
          key: 'id'
        },
        onUpdate : 'CASCADE',
        onDelete: 'CASCADE'
      },
      is_applied_code : {
        type : Sequelize.DataTypes.BOOLEAN,
        defaultValue: 0
      },
      pnr : {
        type : Sequelize.DataTypes.STRING,
        allowNull: false
      },
      hotel_id : {
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
      amount : {
        type : Sequelize.DataTypes.DOUBLE(10 , 2),
        allowNull: false
      },
      booking_key : {
        type : Sequelize.DataTypes.STRING,
        allowNull: false
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

    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('hotel_bookings');
  }
};
