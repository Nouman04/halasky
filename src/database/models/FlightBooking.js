'use strict';

module.exports = (sequelize, DataTypes) => {
  const FlightBooking = sequelize.define('FlightBooking', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_applied_code: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
    },
    code_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    pnr: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DOUBLE(10, 2),
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
    tableName: 'flight_bookings',
    timestamps: true,
    underscored: true, // important so Sequelize maps created_at and updated_at correctly
  });

  FlightBooking.associate = function (models) {
    FlightBooking.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });

    FlightBooking.belongsTo(models.Promotion, {
      foreignKey: 'code_id',
      as: 'promotion',
    });
  };

  return FlightBooking;
};
