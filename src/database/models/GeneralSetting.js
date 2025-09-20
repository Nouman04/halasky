'use strict';

module.exports = (sequelize, DataTypes) => {
  const GeneralSetting = sequelize.define('GeneralSetting', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    type : {
        type: DataTypes.STRING,
        allowNull: false
      },
      is_enabled : {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
  }, {
    tableName: 'general_settings', 
    timestamps: true,
    createdAt : "created_at",
    updatedAt : "updated_at",   
  });

  return GeneralSetting;
};
