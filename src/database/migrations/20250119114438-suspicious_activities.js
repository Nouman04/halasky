'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('suspicious_activities' ,{
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id :{
        type : Sequelize.DataTypes.INTEGER,
        allowNull: true,
        references: {
          model : 'users',
          key: 'id'
        },
        onUpdate : 'CASCADE',
        onDelete: 'CASCADE'
      },
      type : {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
      },
      ip_address : {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      status : {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        defaultValue : 0
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
    return queryInterface.dropTable('suspicious_activities');
  }
};
