'use strict';

module.exports = (sequelize, DataTypes) => {
  const Feedback = sequelize.define('Feedback', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    query_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'customer_queries',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    feedback: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
  }, {
    tableName: 'feedbacks',
    timestamps: false,
  });

  Feedback.associate = function (models) {
    Feedback.belongsTo(models.CustomerQuery, {
      foreignKey: 'query_id',
      as: 'customerQuery',
    });
  };

  return Feedback;
};
