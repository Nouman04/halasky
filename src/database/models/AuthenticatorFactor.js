"use strict";

module.exports = (sequelize, DataTypes) => {
  const AuthenticationFactor = sequelize.define(
    "AuthenticationFactor",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_applied: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 1,
      },
    },
    {
      tableName: "authentication_factors",
      timestamps: true,
    }
  );

  return AuthenticationFactor;
};
