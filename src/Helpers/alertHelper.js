const { Alert } = require('../database/models');

/**
 * Adds a new alert to the system.
 * 
 * @param {string} type - The type of alert (e.g., 'blog', 'promotion').
 * @param {object} data - The alert information (url, id, headline).
 * @param {date|string} expiresAt - Optional expiration date.
 * @returns {Promise<Alert>} - The created alert.
 */
const addAlert = async (type, data, expiresAt = null) => {
    try {
        const alert = await Alert.create({
            type,
            data,
            expires_at: expiresAt
        });
        return alert;
    } catch (error) {
        console.error('Error adding alert:', error.message);
        return null;
    }
};

module.exports = addAlert;
