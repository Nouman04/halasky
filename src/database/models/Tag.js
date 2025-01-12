'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    tagable_type: {
      type: DataTypes.STRING,
      allowNull: true, 
    },
    tagable_id: {
      type: DataTypes.INTEGER,
      allowNull: false, 
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    
    
  }, {
    tableName: 'tags',
    timestamps: false, 
  });

  return Tag;
};
