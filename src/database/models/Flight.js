'use strict';
module.exports = (sequelize, DataTypes) => {
  const Flight = sequelize.define('Flight', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    booking_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    booking_status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    origin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    destination: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    transits: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    pnr: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    amount : {
      type: DataTypes.DOUBLE(10, 2),
      allowNull: false,
    }
  }, {
    tableName: 'flights',
    timestamps: false,
  });

  Flight.associate = function(models) {
    Flight.belongsTo(models.FlightBooking, { foreignKey: 'booking_id' });
    Flight.hasMany(models.Segment, { foreignKey: 'flight_id', as : 'segments' });
    Flight.hasOne(models.FlightLog, { foreignKey: 'flight_id', as: 'log',});
  };

  return Flight;
};
