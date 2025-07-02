'use strict';

module.exports = (sequelize, DataTypes) => {
  const CommunityActivityContent = sequelize.define('CommunityActivityContent', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    community_activity_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'community_activity_content',
    timestamps: false,
  });

  CommunityActivityContent.associate = function(models) {
    CommunityActivityContent.belongsTo(models.CommunityActivity, {
      foreignKey: 'community_activity_id',
      as: 'activity',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  };

  return CommunityActivityContent;
};
