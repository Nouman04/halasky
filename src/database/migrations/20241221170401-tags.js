'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('tags' ,{
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      tagable_type : {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      tagable_id : {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
      },
      title : {
        type : Sequelize.DataTypes.STRING,
        allowNull: false
      }
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('tags');
  }
};
