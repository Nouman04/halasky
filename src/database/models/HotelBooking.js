'use strict';

module.exports = (sequelize, DataTypes) => {
  const HotelBooking = sequelize.define('HotelBooking', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users', 
        key: 'id',    
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    is_applied_code: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,  
    },
    code_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'promotions',
        key: 'id',        
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    pnr : {
      type : DataTypes.STRING,
      allowNull: false
    },
    hotel_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    from: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    to: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DOUBLE(10, 2),
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    booking_key: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'hotel_bookings', 
    timestamps: true,
    createdAt : "created_at",
    updatedAt : "updated_at",   
  });
  

  // Associations
  HotelBooking.associate = function (models) {
    
    HotelBooking.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user', 
    });

    HotelBooking.belongsTo(models.Promotion, {
      foreignKey: 'code_id',
      as: 'promotion', 
    });

    HotelBooking.hasOne(models.PaymentDetail , {
      foreignKey: 'booking_id',
      as: 'paymentDetail', 
    })

    HotelBooking.hasMany(models.Guest, {
      foreignKey: 'hotel_booking_id',
      as: 'guests', 
    });
  };

  return HotelBooking;
};
