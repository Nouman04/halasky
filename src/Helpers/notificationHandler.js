const { Notification, User } = require('../database/models');
const transport = require('../config/mailConfig');

/**
 * Adds a notification to the system and sends an email.
 * 
 * @param {number} userId - The ID of the user to notify.
 * @param {string} type - The type of notification.
 * @param {object} detail - The detail of the notification (msg, id, uuid, etc.).
 * @returns {Promise<object>} - The created notification.
 */
const addNotification = async (userId, type, detail) => {
    try {
        const notification = await Notification.create({
            user_id: userId,
            type: type,
            detail: detail
        });

        // Fetch user email for notification
        const user = await User.findByPk(userId);
        if (user && user.email) {
            const mailOptions = {
                from: process.env.EMAIL_FROM || '"Halasky" <no-reply@halasky.com>',
                to: user.email,
                subject: `New Notification: ${type.toUpperCase()}`,
                text: detail.msg || `You have a new ${type} notification on Halasky.`,
            };

            transport.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending notification email:', error);
                } else {
                    console.log('Notification email sent:', info.response);
                }
            });
        }

        return notification;
    } catch (error) {
        console.error('Error adding notification:', error);
        throw error;
    }
};

module.exports = {
    addNotification
};
