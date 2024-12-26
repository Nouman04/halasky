"use strict";

module.exports = (sequelize, DataTypes) => {
  const ActivityAction = sequelize.define(
    "ActivityAction",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      is_spam: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_saved: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      activity_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "community_activities",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    },
    {
      tableName: "activity_actions",
      timestamps: true,
    }
  );

  return ActivityAction;
};
