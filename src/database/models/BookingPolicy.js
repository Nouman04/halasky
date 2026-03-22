'use strict';

module.exports = (sequelize, DataTypes) => {
  const BookingPolicy = sequelize.define('BookingPolicy', {
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
    is_refundable: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_changeable: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    policy_detail: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    baggage_detail: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  }, {
    tableName: 'booking_policies',
    timestamps: true,
    underscored: true,
  });

  BookingPolicy.associate = function (models) {
    BookingPolicy.belongsTo(models.Flight, {
      foreignKey: 'flight_id',
      as: 'flight',
    });
  };

  return BookingPolicy;
};
