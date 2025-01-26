'use strict';
module.exports = (sequelize, DataTypes) => {
  const SuspiciousActivity = sequelize.define('SuspiciousActivity', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id :{
        type : DataTypes.INTEGER,
        allowNull: true,
        references: {
          model : 'users',
          key: 'id'
        },
        onUpdate : 'CASCADE',
        onDelete: 'CASCADE'
      },
      type : {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      ip_address : {
        type: DataTypes.STRING,
        allowNull: false
      },
      status : {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue : 0
      }
  }, {
    tableName: 'suspicious_activities',
    timestamps: true, 
  });

  SuspiciousActivity.associate = function(models) {
    
    SuspiciousActivity.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      as : 'user'
    });
  };

  return SuspiciousActivity;
};
