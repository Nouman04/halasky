"use strict";

module.exports = (sequelize, DataTypes) => {
  const Flight = sequelize.define(
    "Flight",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      flightNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      airline: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      departureTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      arrivalTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: "flights",
      timestamps: false,
    }
  );

  Flight.associate = function (models) {
    Flight.hasMany(models.Passenger, {
      foreignKey: "flightId",
      as: "passengers",
    });
    Flight.hasMany(models.Leg, { foreignKey: "flightId", as: "legs" });
  };
  return Flight;
};
