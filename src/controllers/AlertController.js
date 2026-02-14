const { Alert } = require('../database/models');
const { Sequelize } = require('sequelize');

module.exports = {
    list: async (request, response) => {
        try {
            const today = new Date();

            const alerts = await Alert.findAll({
                where: {
                    [Sequelize.Op.or]: [
                        { expires_at: null },
                        { expires_at: { [Sequelize.Op.gt]: today } }
                    ]
                },
                order: [['expires_at', 'ASC'], ['created_at', 'DESC']]
            });

            return response.status(200).json({
                status: true,
                data: alerts
            });
        } catch (error) {
            return response.status(500).json({
                status: false,
                message: 'Something Went Wrong',
                error: error.message
            });
        }
    }
};
