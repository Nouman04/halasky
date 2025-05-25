'use strict';

module.exports = (sequelize, DataTypes) => {
  const ActivityAction = sequelize.define('ActivityAction', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    activity_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    activity_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_spam: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    is_saved: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
  }, {
    tableName: 'activity_actions',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  ActivityAction.associate = function (models) {
    ActivityAction.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    ActivityAction.belongsTo(models.CommunityActivity, {
      foreignKey: 'activity_id',
      as: 'activity',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

  return ActivityAction;
};
