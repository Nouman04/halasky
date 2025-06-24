'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('segments', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      flight_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'flights',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      departure_date: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      arrival_date: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      flight_number: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      flight_code: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      stops: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('segments');
  }
};
