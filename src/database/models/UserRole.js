'use strict';

module.exports = (sequelize, DataTypes) => {
  const UserRole = sequelize.define('UserRole', {
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
        model: 'users', 
        key: 'id',    
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'roles', 
        key: 'id',     
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  }, {
    tableName: 'user_roles', 
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',       
  });

  
  return UserRole;
};
// UserRole.associate = function (models) {
//   UserRole.belongsTo(models.User, { foreignKey: 'role_id' });
//   UserRole.belongsTo(models.Permission, { foreignKey: 'permission_id' });
// };
