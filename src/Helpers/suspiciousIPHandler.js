const { SuspiciousActivity } = require('../database/models');

const suspiciousIPHandler = (type) => {
    return async (req, res, next) => { // Ensure function is returned
        try {
            console.log("inside suspicious activity");

            let userId = req.body?.userId || null;
            let ipAddress = req.ip;

            await SuspiciousActivity.create({
                ip_address: ipAddress,
                type: type,
                user_id: userId,
            });

            res.status(429).json({
                status: 429,
                error: 'Too many requests, please try again later'
            });

        } catch (error) {
            console.error( error );
            res.status(500).json({
                message: "Error logging suspicious activity"
            });
        }
    };
};

module.exports = suspiciousIPHandler;
