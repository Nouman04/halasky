'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    tableName: 'categories',
    timestamps: false,
  });

  Category.associate = function(models) {
    // Define associations if any, for example:
    // Category.hasMany(models.Product, {
    //   foreignKey: 'category_id',
    // });
  };

  return Category;
};
