'use strict';

module.exports = (sequelize, DataTypes) => {
  const Promotion = sequelize.define('Promotion', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',     
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    promotion_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    applicable_service: {
      type: DataTypes.ENUM('flight' , 'hotel' , 'both'),
      allowNull: false,
    },
    promotion_type: {
      type: DataTypes.ENUM('fixed' , 'percentage'),
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, 
    },
    percentage: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
     fixed_amount: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    applicable_from: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    applicable_to: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    condition: {
      type: DataTypes.ENUM('minimum' , 'none'),
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    total_promo : {
      type: DataTypes.INTEGER,
      allowNull: false, 
    },
    used_promo : {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    tableName: 'promotions', 
    timestamps: false,   
    createdAt: 'created_at',
    updatedAt: 'updated_at',   
  });

  // Associations
  Promotion.associate = function (models) {
    Promotion.belongsTo(models.User, {
      foreignKey: 'created_by',
      as: 'creator', 
    });
  };

  return Promotion;
};
