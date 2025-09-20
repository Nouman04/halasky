'use strict';
module.exports = (sequelize, DataTypes) => {
  const Permission = sequelize.define('Permission', {
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
  }, {
    tableName: 'permissions',
    timestamps: false, 
  });

  Permission.associate = function(models) {
     Permission.belongsToMany(models.Role, {
      through: models.RolePermission,
      foreignKey: 'permission_id',
      otherKey: 'role_id',
    });

    
    Permission.hasMany(models.RolePermission, {
      foreignKey: 'permission_id',
    });
  };

  return Permission;
};
