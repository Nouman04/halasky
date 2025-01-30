"use strict";

const Feedback = require("./Feedback");

module.exports = (sequelize, DataTypes) => {
  const CustomerQuery = sequelize.define(
    "CustomerQuery",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
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
      attended_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      query: {
        type: DataTypes.TEXT("long"),
        allowNull: false,
      },
      answer: {
        type: DataTypes.TEXT("long"),
        allowNull: true,
      },
      priority: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      tableName: "customer_queries",
      timestamps: true,
    }
  );

  CustomerQuery.associate = function (models) {
    CustomerQuery.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });

    CustomerQuery.belongsTo(models.User, {
      foreignKey: "attended_by",
      as: "attendedBy",
    });

    CustomerQuery.hasOne(Feedback, {
      foreignKey: "query_id",
      as: "feedback",
    });
  };

  return CustomerQuery;
};
