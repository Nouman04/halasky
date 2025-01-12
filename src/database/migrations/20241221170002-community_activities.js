'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('community_activities' , {
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
        onUpdate : 'CASCADE',
        onDelete: 'CASCADE'
      },
      category_id : {
        type : Sequelize.DataTypes.INTEGER,
        allowNull: true,
        references: {
          model : 'categories',
          key: 'id'
        },
        onUpdate : 'CASCADE',
        onDelete: 'CASCADE'
      },
      title: {
        type : Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type : Sequelize.DataTypes.TEXT('long'),
        allowNull: true,
      },
      description: {
        type : Sequelize.DataTypes.TEXT('long'),
        allowNull: false,
      },
      is_approved: {
        type : Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 1,
      },
      status : {
        type : Sequelize.DataTypes.INTEGER,
        allowNull : false,
        defaultValue: 0
      },
      action_time : {
        type : Sequelize.DataTypes.DATE,
        allowNull : true
      }
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('community_activities');
  }
};
