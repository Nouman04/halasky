"use strict";
module.exports = (sequelize, DataTypes) => {
  const RolePermission = sequelize.define(
    "RolePermission",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "roles",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      permission_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "permissions",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    },
    {
      tableName: "role_permissions",
      timestamps: true,
    }
  );

  RolePermission.associate = function (models) {
    RolePermission.belongsTo(models.Role, {
      foreignKey: "role_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    RolePermission.belongsTo(models.Permission, {
      foreignKey: "permission_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return RolePermission;
};
