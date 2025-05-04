'use strict';

module.exports = (sequelize, DataTypes) => {
  const Chat = sequelize.define('Chat', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    sender_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    receiver_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    tableName: 'chats',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  Chat.associate = function(models) {
    Chat.belongsTo(models.User, {
      as: 'sender',
      foreignKey: 'sender_id',
    });

    Chat.belongsTo(models.User, {
      as: 'receiver',
      foreignKey: 'receiver_id',
    });
  };

  return Chat;
};
