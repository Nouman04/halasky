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
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "recovery_requests",
<<<<<<< HEAD
      timestamps: true,
=======
      timestamps: false,
>>>>>>> controllers/y-changes
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
