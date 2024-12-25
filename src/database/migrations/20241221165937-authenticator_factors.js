'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('authentication_factors' , {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      type : {
        type : Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      is_applied: {
        type : Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 1,
      }

    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('authentication_factors')
  }
};
