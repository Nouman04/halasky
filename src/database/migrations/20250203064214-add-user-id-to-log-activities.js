module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("log_activities", "user_id", {
      type: Sequelize.INTEGER,
      allowNull: false, // Change to true if some records exist without a user_id
      references: {
        model: "users", // Change this to the correct table name
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("log_activities", "user_id");
  },
};
