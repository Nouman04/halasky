'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("payment_details", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      booking_id: {
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
        allowNull: false
      },
      last_name : {
        type : Sequelize.DataTypes.STRING,
        allowNull: false
      },
      card_type : {
        type : Sequelize.DataTypes.STRING,
        allowNull: false
      },
      card_code : {
        type : Sequelize.DataTypes.STRING,
        allowNull: false
      },
      card_number : {
        type : Sequelize.DataTypes.STRING,
        allowNull: false
      },
      card_expiry_month : {
        type : Sequelize.DataTypes.INTEGER,
        allowNull: false
      },
      card_expiry_year : {
        type : Sequelize.DataTypes.INTEGER,
        allowNull: false
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("payment_details");
  }
};
