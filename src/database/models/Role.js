'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
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
    tableName: 'roles',
    timestamps: false, 
  });

  Role.associate = function(models) {
    Role.belongsToMany( sequelize.define('User'), { through: 'UserRole', foreignKey: 'role_id' , otherKey : 'user_id' });
  };

  return Role;
};
