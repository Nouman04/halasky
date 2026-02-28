'use strict';

module.exports = (sequelize, DataTypes) => {
    const Alert = sequelize.define('Alert', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        data: {
            type: DataTypes.JSON,
            allowNull: false,
        },
        expires_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    }, {
        tableName: 'alerts',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    return Alert;
};
