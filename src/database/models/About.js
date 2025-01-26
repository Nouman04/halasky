'use strict';

module.exports = (sequelize, DataTypes) => {
  const About = sequelize.define('about_content', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      upper_content : {
        type: DataTypes.TEXT('long'),
        allowNull: false
      },
      lower_content : {
        type: DataTypes.TEXT('long'),
        allowNull: false
      },
  }, {
    tableName: 'about_content',
    timestamps: false,
  });

  About.associate = function (models) {
    About.hasMany(sequelize.define('AboutImage'), {
      foreignKey: 'content_id',
      as: 'images',
    });
  };

  return About;
};
