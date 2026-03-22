'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('booking_policies', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      flight_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'flights',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      is_refundable: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_changeable: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
      },
      policy_detail: {
        type: Sequelize.DataTypes.JSON,
        allowNull: true,
      },
      baggage_detail: {
        type: Sequelize.DataTypes.JSON,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      updated_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('booking_policies');
  }
};
