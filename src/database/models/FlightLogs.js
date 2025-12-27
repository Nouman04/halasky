'use strict';

module.exports = (sequelize, DataTypes) => {
  const FlightLog = sequelize.define('FlightLog', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      type : {
        type : DataTypes.ENUM('availablity' , 'booking'),
        allowNull : false
      },
      flight_id : {
        type : DataTypes.INTEGER,
        allowNull: false,
        references: {
          model : 'flights',
          key: 'id'
        },
        onUpdate : 'CASCADE',
        onDelete: 'CASCADE'
    },
    log_path: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'flight_logs',
    timestamps: true,
    underscored: true, // important so Sequelize maps created_at and updated_at correctly
  });

  FlightLog.associate = function (models) {
    FlightLog.belongsTo(models.Flight, {
      foreignKey: 'flight_id',
      as: 'flights',
    });
  };

  return FlightLog;
};
