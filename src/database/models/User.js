"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      is_platform_logged: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
        allowNull: false,
      },
      platform_type: {
        type: DataTypes.ENUM("google", "facebook"),
        allowNull: true,
      },
      platform_image: {
        type: DataTypes.TEXT("long"),
        allowNull: false,
        defaultValue: "https://yourdomain.com/default-profile.png",
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: "users",
      timestamps: true,
    }
  );

  User.associate = function (models) {
    User.belongsToMany(models.Role, {
      through: "user_roles",
      foreignKey: "user_id",
      otherKey: "role_id",
    });
  };

  return User;
};
