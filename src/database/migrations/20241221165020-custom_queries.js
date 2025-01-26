'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('customer_queries' , {
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
      subject : {
        type : Sequelize.DataTypes.TEXT('long'),
        allowNull: false,
      },
      attended_by : {
        type : Sequelize.DataTypes.INTEGER,
        allowNull: true,
        references: {
          model : 'users',
          key: 'id'
        },
        onUpdate : 'CASCADE',
        onDelete: 'CASCADE'
      },
      query: {
        type : Sequelize.DataTypes.TEXT('long'),
        allowNull : false,
      },
      answer : {
        type : Sequelize.DataTypes.TEXT('long'),
        allowNull : true,
      },
      priority: {
        type : Sequelize.DataTypes.INTEGER,
        allowNull: false,
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
      
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('customer_queries');
  }
};
