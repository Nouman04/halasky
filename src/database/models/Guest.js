'use strict';

module.exports = (sequelize, DataTypes) => {
  const Guest = sequelize.define('Guest', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      hotel_booking_id: {
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
        allowNull : false,
      },
      last_name : { 
        type : DataTypes.STRING,
        allowNull : false,
      },
      is_lead_guest : { 
        type : DataTypes.BOOLEAN,
        allowNull : false,
        defaultValue: false
      },
      phone_number: {
        type : DataTypes.STRING,
        allowNull : true,
      },
      email: {
        type : DataTypes.STRING,
        allowNull : true,
      },
      age: {
        type : DataTypes.INTEGER,
        allowNull : true,
      },
      type : {
        type : DataTypes.ENUM('ADT' , 'CHD'),
        allowNull : false
      }
  }, {
    tableName: 'guests',
    timestamps: true, 
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  Guest.associate = function (models) {
    Guest.belongsTo(models.HotelBooking, {
                                      foreignKey: 'hotel_booking_id',
                                      as: 'booking',
                                    });
  };

  return Guest;
};
