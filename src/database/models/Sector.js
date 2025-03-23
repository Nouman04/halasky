"use strict";

module.exports = (sequelize, DataTypes) => {
  const Sector = sequelize.define(
    "Sector",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      legId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "legs",
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
      time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      airlineName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      airlineNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "sectors",
      timestamps: false,
    }
  );

  Sector.associate = function (models) {
    Sector.belongsTo(models.Leg, { foreignKey: "legId", as: "leg" });
  };

  return Sector;
};
