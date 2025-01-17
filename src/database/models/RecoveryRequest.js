"use strict";

module.exports = (sequelize, DataTypes) => {
  const RecoveryRequest = sequelize.define(
    "RecoveryRequest",
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
      status: {
        type: DataTypes.ENUM("0", "1", "2"),
        allowNull: false,
        defaultValue: "0",
      },
    },
    {
      tableName: "recovery_requests",
      timestamps: false,
    }
  );

  RecoveryRequest.associate = function (models) {
    RecoveryRequest.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });
  };

  return RecoveryRequest;
};
