'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('violations' ,{
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      added_by : {
        type : Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model : 'users',
          key: 'id'
        },
      },
      user_id : {
        type : Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model : 'users',
          key: 'id'
        },
      },
      violationable_type : {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      violationable_id : {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
      },
      reason : {
        type : Sequelize.DataTypes.TEXT('long'),
        allowNull: true
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
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('violations');
  }
};
