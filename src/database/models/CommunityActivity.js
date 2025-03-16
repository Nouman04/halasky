"use strict";

module.exports = (sequelize, DataTypes) => {
  const CommunityActivity = sequelize.define(
    "CommunityActivity",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      added_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "categories",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.TEXT("long"),
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT("long"),
        allowNull: false,
      },
      is_approved: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      action_time: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "community_activities",
      timestamps: false,
    }
  );

  CommunityActivity.associate = function (models) {
    CommunityActivity.hasMany(sequelize.define("Tag"), {
      foreignKey: "tagable_id",
      as: "tags",
      scope: {
        tagable_type: "CommunityActivity",
      },
    });

    CommunityActivity.hasMany(sequelize.define("Comment"), {
      foreignKey: "commentable_id",
      as: "comments",
      scope: {
        commentable_type: "CommunityActivity",
      },
    });

    CommunityActivity.belongsTo(models.Category, {
      foreignKey: "category_id",
      as: "category",
    });

    CommunityActivity.hasMany(models.PollQuestion, {
      foreignKey: "community_activity_id",
      as: "pollQuestions",
      onDelete: "CASCADE",
    });
  };

  return CommunityActivity;
};
