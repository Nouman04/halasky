"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("guests", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      hotel_booking_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "hotel_bookings",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      first_name : { 
        type : Sequelize.DataTypes.STRING,
        allowNull : false,
      },
      last_name : { 
        type : Sequelize.DataTypes.STRING,
        allowNull : false,
      },
      is_lead_guest : { 
        type : Sequelize.DataTypes.BOOLEAN,
        allowNull : false,
        defaultValue: false
      },
      phone_number: {
        type : Sequelize.DataTypes.STRING,
        allowNull : true,
      },
      age: {
        type : Sequelize.DataTypes.INTEGER,
        allowNull : true,
      },
      email: {
        type : Sequelize.DataTypes.STRING,
        allowNull : true,
      },
      type : {
        type : Sequelize.DataTypes.ENUM('ADT' , 'CHD'),
        allowNull : false
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
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("guests");
  },
};
