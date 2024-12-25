'use strict';

module.exports = (sequelize, DataTypes) => {
  const AiChat = sequelize.define('AiChat', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    questioned_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    question: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
    answer: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
  }, {
    tableName: 'ai_chats',
    timestamps: false,
  });

  AiChat.associate = function (models) {
    AiChat.belongsTo(models.User, {
      foreignKey: 'questioned_by',
      as: 'questionedByUser',
    });
  };

  return AiChat;
};
