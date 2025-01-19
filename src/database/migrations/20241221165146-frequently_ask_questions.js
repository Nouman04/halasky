'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('frequently_ask_questions' , {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      created_by : {
        type : Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model : 'users',
          key: 'id'
        },
        onUpdate : 'CASCADE',
        onDelete: 'CASCADE'
      },
      question: {
        type: Sequelize.DataTypes.TEXT('long'),
        allowNull: false,
      },
      answer: {
        type: Sequelize.DataTypes.TEXT('long'),
        allowNull: false,
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
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('frequently_ask_questions');
  }
};
