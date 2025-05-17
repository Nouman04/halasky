'use strict';
module.exports = (sequelize, DataTypes) => {
  const PaymentDetail = sequelize.define('PaymentDetail', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      booking_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "hotel_bookings",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      first_name : {
        type : DataTypes.STRING,
        allowNull: false
      },
      last_name : {
        type : DataTypes.STRING,
        allowNull: false
      },
      card_type : {
        type : DataTypes.STRING,
        allowNull: false
      },
      card_code : {
        type : DataTypes.STRING,
        allowNull: false
      },
      card_number : {
        type : DataTypes.STRING,
        allowNull: false
      },
      card_expiry_month : {
        type : DataTypes.INTEGER,
        allowNull: false
      },
      card_expiry_year : {
        type : DataTypes.INTEGER,
        allowNull: false
      }
  }, {
    tableName: 'payment_details',
    timestamps: false
  });

  PaymentDetail.associate = function(models) {
    
    PaymentDetail.belongsTo(models.HotelBooking, {
      foreignKey: 'booking_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      as : 'booking'
    });

  };

  return PaymentDetail;
};
