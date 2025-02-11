"use strict";

module.exports = (sequelize, DataTypes) => {
  const UserRole = sequelize.define(
    "UserRole",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: { model: "users", key: "id" },
        onDelete: "CASCADE",
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
    },
    {
      tableName: "user_roles",
      timestamps: true,
    }
  );

  UserRole.associate = function (models) {
    UserRole.belongsTo(models.User, { foreignKey: "user_id" });
    UserRole.belongsTo(models.Role, { foreignKey: "role_id" });
  };

  return UserRole;
};
