module.exports = (sequelize, DataTypes) => {
  const PollQuestion = sequelize.define(
    "PollQuestion",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      community_activity_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "community_activities",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      question_text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    { tableName: "poll_questions" }
  );

  PollQuestion.associate = function (models) {
    PollQuestion.belongsTo(models.CommunityActivity, {
      foreignKey: "community_activity_id",
      as: "communityActivity",
      onDelete: "CASCADE",
    });

    PollQuestion.hasMany(models.PollOption, {
      foreignKey: "poll_question_id",
      as: "options",
      onDelete: "CASCADE",
    });
  };

  return PollQuestion;
};
