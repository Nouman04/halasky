'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('roles' , {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: Sequelize.DataTypes.STRING,
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('roles');
  }
};
