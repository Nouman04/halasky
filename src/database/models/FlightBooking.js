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
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    flight_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    flight_code: {
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
  }, {
    tableName: 'flight_bookings', 
    timestamps: false,           
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
