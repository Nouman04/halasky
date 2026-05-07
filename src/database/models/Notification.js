'use strict';
module.exports = (sequelize, DataTypes) => {
    const Notification = sequelize.define('Notification', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        detail: {
            type: DataTypes.JSON,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        reads_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    }, {
        tableName: 'notifications',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    Notification.associate = function (models) {
        Notification.belongsTo(models.User, { foreignKey: 'user_id' });
    };

    return Notification;
};
