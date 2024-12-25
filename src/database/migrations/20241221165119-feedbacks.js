'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('feedbacks' , {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      query_id : {
        type : Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model : 'customer_queries',
          key: 'id'
        },
        onUpdate : 'CASCADE',
        onDelete: 'CASCADE'
      },
      rating: {
        type: Sequelize.DataTypes.FLOAT,
        allowNull: false,
      },
      feedback: {
        type: Sequelize.DataTypes.TEXT('long'),
        allowNull: false,
      }
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('feedbacks');
  }
};
