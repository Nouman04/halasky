"use strict";

module.exports = (sequelize, DataTypes) => {
  const Leg = sequelize.define(
    "Leg",
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
      origin: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      destination: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "legs",
      timestamps: false,
    }
  );
  Leg.associate = function (models) {
    Leg.hasMany(models.Sector, { foreignKey: "legId", as: "sectors" });
    Leg.belongsTo(models.Flight, { foreignKey: "flightId", as: "flight" });
  };
  return Leg;
};
