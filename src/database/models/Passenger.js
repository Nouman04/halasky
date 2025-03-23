"use strict";

module.exports = (sequelize, DataTypes) => {
  const Passenger = sequelize.define(
    "Passenger",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      flightId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "flights",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      total: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      flightPnrResponse: {
        type: DataTypes.JSON,
        allowNull: false,
      },
    },
    { tableName: "passengers", timestamps: false }
  );
  Passenger.associate = (models) => {
    Passenger.belongsTo(models.Flight, {
      foreignKey: "flightId",
      as: "flight",
    });
  };
  return Passenger;
};
