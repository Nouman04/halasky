'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('flights', {
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
          model: 'flight_bookings',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      booking_status : {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
      },
      origin: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      destination: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: Sequelize.DataTypes.DATEONLY,
        allowNull: false,
      },
      transits: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      pnr: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      amount : {
        type: Sequelize.DataTypes.DOUBLE(10, 2),
        allowNull: false,
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('flights');
  }
};
