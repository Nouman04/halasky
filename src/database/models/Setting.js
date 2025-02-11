"use strict";

module.exports = (sequelize, DataTypes) => {
  const Setting = sequelize.define(
    "Setting",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      primary_color: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      secondary_color: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      third_color: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      fourth_color: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fifth_color: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      primary_font: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      secondary_font: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "settings",
      timestamps: false,
    }
  );

  return Setting;
};
