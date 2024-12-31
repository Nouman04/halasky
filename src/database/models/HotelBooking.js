"use strict";

module.exports = (sequelize, DataTypes) => {
  const HotelBooking = sequelize.define(
    "HotelBooking",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      is_applied_code: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
      },
      code_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "promotions",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      hotel_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hotel_code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      payment_id: {
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
    },
    {
      tableName: "hotel_bookings",
      timestamps: true,
    }
  );

  // Associations
  HotelBooking.associate = function (models) {
    HotelBooking.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });

    HotelBooking.belongsTo(models.Promotion, {
      foreignKey: "code_id",
      as: "promotion",
    });
  };

  return HotelBooking;
};
