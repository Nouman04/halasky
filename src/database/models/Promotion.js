"use strict";

module.exports = (sequelize, DataTypes) => {
  const Promotion = sequelize.define(
    "Promotion",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      promotion_type: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      percentage: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      applicable_from: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      applicable_to: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      condition: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: "promotions",
      timestamps: true,
    }
  );

  // Associations
  Promotion.associate = function (models) {
    Promotion.belongsTo(models.User, {
      foreignKey: "created_by",
      as: "creator",
    });
  };

  return Promotion;
};
