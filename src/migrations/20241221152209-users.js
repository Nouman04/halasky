'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('users' , {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: Sequelize.DataTypes.STRING,
      number: Sequelize.DataTypes.STRING,
      email: Sequelize.DataTypes.STRING,
      is_platform_logged : {
        type : Sequelize.DataTypes.BOOLEAN,
        defaultValue: 0,
        allowNull : false
      },
      platform_type : {
        type : Sequelize.DataTypes.ENUM('google' , 'facebook'),
        allowNull: true
      },
      platform_image : {
        type : Sequelize.DataTypes.TEXT('long'),
        allowNull: false
      },
      status : Sequelize.DataTypes.INTEGER
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('users');
  }
};