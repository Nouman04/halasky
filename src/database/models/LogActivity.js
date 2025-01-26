'use strict';
module.exports = (sequelize, DataTypes) => {
  const LogActivity = sequelize.define('LogActivity', {
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
      title : {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      action : {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      information : {
        type: DataTypes.TEXT('long'),
        allowNull: false
      }
  }, {
    tableName: 'log_activities',
    timestamps: true, 
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  LogActivity.associate = function(models) {
    
    LogActivity.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      as : 'user'
    });
  };

  return LogActivity;
};
