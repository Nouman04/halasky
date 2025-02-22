'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('json_handler' ,{
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      type : {
        type : Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      information : {
        type: Sequelize.DataTypes.JSON,
        allowNull: false
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
    return queryInterface.dropTable('json_handler');
  }
};
