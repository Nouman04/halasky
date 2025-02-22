'use strict';
module.exports = (sequelize, DataTypes) => {
  const JsonHandler = sequelize.define('JsonHandler', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      type : {
        type : DataTypes.STRING,
        allowNull: false,
      },
      information : {
        type: DataTypes.JSON,
        allowNull: false
      },
  } ,{
    tableName: 'json_handler',
    timestamps: true, 
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  return JsonHandler;
};
