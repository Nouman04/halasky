'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    commentable_type: {
      type: DataTypes.STRING,
      allowNull: true, 
    },
    commentable_id: {
      type: DataTypes.INTEGER,
      allowNull: false, 
    },
    comment : {
      type: DataTypes.TEXT('long'),
      allowNull: false, 
    },
    
    
  }, {
    tableName: 'comments',
    timestamps: false, 
  });

  return Tag;
};
