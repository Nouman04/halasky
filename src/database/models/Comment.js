'use strict';

module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
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
    added_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    }
  }, {
    tableName: 'comments',
    timestamps: false, 
  });

  Comment.associate = (models) => {
    Comment.belongsTo(models.User, {
      foreignKey: 'added_by',
      as: 'commentedUser',
    });
  };

  return Comment;
};
