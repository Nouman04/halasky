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
      activity_type : {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      activity_id : {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
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
      },
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('activity_actions');
  }
};
