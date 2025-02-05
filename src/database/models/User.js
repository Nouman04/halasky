'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
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
      type: DataTypes.ENUM('google', 'facebook'),
      allowNull: true,
    },
    platform_image: {
      type: DataTypes.TEXT('long'),
      allowNull: true,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    token : {
      type : DataTypes.TEXT('long'),
      allowNull : true
    },
    expires_at : {
      type : DataTypes.DATE,
      allowNull : true
    },
    is_email_verified : {
      type : DataTypes.BOOLEAN,
      defaultValue : 0,
      allowNull :false
    },
    password : {
      type : DataTypes.TEXT('long'),
      allowNull : false
    },
  }, {
    tableName: 'users',
    timestamps: false, 
  });

  User.associate = function(models) {
    // Define associations if any, for example:
    // User.hasMany(models.RolePermission, {
    //   foreignKey: 'role_id',
    // });
    // User.belongsToMany( sequelize.define('Role'), { through: 'user_roles', foreignKey: 'user_id'  , otherKey : 'role_id' });
       User.belongsToMany(models.Role , {through: 'UserRole', foreignKey: 'user_id'  , otherKey : 'role_id' });
       User.hasMany(models.RecoveryRequest, { foreignKey: 'user_id' });
  };

  return User;
};
