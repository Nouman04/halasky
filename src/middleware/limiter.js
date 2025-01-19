const rateLimiter = require('express-rate-limit');


const limiter = rateLimiter({
    windowMS: 2 * 60 * 1000,
    maxLimit: 50,
    message : {
        statue : 429,
        error : 'You have exceeded the request limit'
    },
    standardHeaders : true,
    legacyHandler : false,
    handler : suspiciousIPHandler(1)
})

module.exports = limiter;