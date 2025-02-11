module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("log_activities", "action", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("log_activities", "action");
  },
};
