'use strict';

module.exports = (sequelize, DataTypes) => {
  const FrequentlyAskQuestion = sequelize.define('FrequentlyAskQuestion', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    created_by: {
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
    tableName: 'frequently_ask_questions',
    timestamps: false,
  });

  FrequentlyAskQuestion.associate = function (models) {
    FrequentlyAskQuestion.belongsTo(models.User, {
      foreignKey: 'created_by',
      as: 'createdByUser',
    });
  };

  return FrequentlyAskQuestion;
};
