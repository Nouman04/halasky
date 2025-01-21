'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('about_images' ,{
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      content_id : {
        type : Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model : 'about_content',
          key: 'id'
        },
        onUpdate : 'CASCADE',
        onDelete: 'CASCADE'
      },
      image : {
        type: Sequelize.DataTypes.TEXT('long'),
        allowNull: false
      },
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('about_images');
  }
};
