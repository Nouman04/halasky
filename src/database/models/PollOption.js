module.exports = (sequelize, DataTypes) => {
  const PollOption = sequelize.define(
    "PollOption",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      poll_question_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "poll_questions",
          key: "id",
        },
      },
      option_text: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "poll_options",
      timestamps: false,
    }
  );

  PollOption.associate = function (models) {
    PollOption.belongsTo(models.PollQuestion, {
      foreignKey: "poll_question_id",
      as: "pollQuestion",
      onDelete: "CASCADE",
    });

    PollOption.hasMany(models.PollAnswer, {
      foreignKey: "poll_option_id",
      as: "answers",
      onDelete: "CASCADE",
    });
  };

  return PollOption;
};
