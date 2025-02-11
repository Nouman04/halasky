"use strict";
module.exports = (sequelize, DataTypes) => {
  const Permission = sequelize.define(
    "Permission",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "permissions",
      timestamps: true,
    }
  );

  Permission.associate = function (models) {
    // Define associations if any, for example:
    // Permission.hasMany(models.RolePermission, {
    //   foreignKey: 'permission_id',
    // });
    Permission.belongsToMany(models.Role, {
      through: "role_permissions",
      foreignKey: "permission_id",
      otherKey: "role_id",
    });
  };

  return Permission;
};
