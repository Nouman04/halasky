'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('log_activities' ,{
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
      },
      title: {
        type : Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      action: {
        type : Sequelize.DataTypes.TEXT('long'),
        allowNull: false,
      },
      information : {
        type : Sequelize.DataTypes.JSON,
        allowNull: true
      },
      
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('log_activities');
  }
};
