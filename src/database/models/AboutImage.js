'use strict';

module.exports = (sequelize, DataTypes) => {
  const AboutImage = sequelize.define('AboutImage', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      content_id : {
        type : DataTypes.INTEGER,
        allowNull: false,
        references: {
          model : 'about_content',
          key: 'id'
        },
        onUpdate : 'CASCADE',
        onDelete: 'CASCADE'
      },
      image : {
        type: DataTypes.TEXT('long'),
        allowNull: false
      },
  }, {
    tableName: 'about_images',
    timestamps: false,
  });

  return AboutImage;
};
