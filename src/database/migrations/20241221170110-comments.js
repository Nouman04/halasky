'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('comments' ,{
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
      commentable_type : {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      commentable_id : {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
      },
      comment : {
        type : Sequelize.DataTypes.TEXT('long'),
        allowNull: false
      }
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('comments');
  }
};
