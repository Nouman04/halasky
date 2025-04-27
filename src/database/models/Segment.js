'use strict';
module.exports = (sequelize, DataTypes) => {
  const Segment = sequelize.define('Segment', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    flight_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    departure_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    arrival_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    flight_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    flight_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'segments',
    timestamps: false,
  });

  Segment.associate = function(models) {
    Segment.belongsTo(models.Flight, { foreignKey: 'flight_id' });
  };

  return Segment;
};
