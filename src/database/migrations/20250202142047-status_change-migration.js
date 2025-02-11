module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("users", "status", {
      type: Sequelize.ENUM("0", "1"),
      allowNull: false,
      defaultValue: "1",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("users", "status", {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    });
  },
};
