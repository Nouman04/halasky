'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('activity_actions' ,{
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
        onUpdate : 'CASCADE',
        onDelete: 'CASCADE'
      },
      activity_id : {
        type : Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model : 'community_activities',
          key: 'id'
        },
        onUpdate : 'CASCADE',
        onDelete: 'CASCADE'
      },
      is_spam: {
        type : Sequelize.DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: 0,
      },
      is_saved: {
        type : Sequelize.DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: 0,
      }
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('activity_actions');
  }
};
