'use strict';

module.exports = (sequelize, DataTypes) => {
  const Violation = sequelize.define('Violation', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    added_by : {
        type : DataTypes.INTEGER,
        allowNull: false,
        references: {
          model : 'users',
          key: 'id'
        },
      },
      user_id : {
        type : DataTypes.INTEGER,
        allowNull: false,
        references: {
          model : 'users',
          key: 'id'
        },
      },
      violationable_type : {
        type: DataTypes.STRING,
        allowNull: false
      },
      violationable_id : {
        type:DataTypes.INTEGER,
        allowNull: false
      },
      reason : {
        type : DataTypes.TEXT('long'),
        allowNull: true
      }
  }, {
    tableName: 'violations', 
    timestamps: true,       
  });
  
  Violation.associate = (models) => {
    Violation.belongsTo(models.User, { foreignKey: 'added_by', as: 'addedBy' });
    Violation.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  };
  return Violation;
};
