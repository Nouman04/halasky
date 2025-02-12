const rateLimiter = require('express-rate-limit');
const suspiciousIPHandler =require('../Helpers/suspiciousIPHandler');
const limiter = rateLimiter({
    windowMs: 2 * 60 * 1000,
    max: 50,
    message : {
        statue : 429,
        error : 'You have exceeded the request limit'
    },
    standardHeaders : true,
    legacyHandler : false,
    handler : suspiciousIPHandler(1)
})

module.exports = limiter;