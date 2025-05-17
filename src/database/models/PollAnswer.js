module.exports = (sequelize, DataTypes) => {
  const PollAnswer = sequelize.define(
    "PollAnswer",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      poll_option_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "poll_options",
          key: "id",
        },
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
    },
    {
      tableName: "poll_answers",
      timestamps: true,
    }
  );

  PollAnswer.associate = function (models) {
    PollAnswer.belongsTo(models.PollOption, {
      foreignKey: "poll_option_id",
      as: "pollOption",
      onDelete: "CASCADE",
    });

    PollAnswer.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
      onDelete: "CASCADE",
    });
  };

  return PollAnswer;
};
