const { request } = require('express')
const SuspiciousActivity = require('../database/models/SuspiciousAcitivity')

const suspiciousIPHandler = (type) => {
    // let userId = request.body.userId;
    // async (request , response , next , option) => {
    //     try {
    //             await SuspiciousActivity.create({
    //                 ip_address : request.body.ip,
    //                 type : type,
    //                 user_id : userId,
    //             });
    //             next();

    //         } catch (error){
    //             response.status(500).json({
    //                 message: 'An error occurred while logging suspicious activity.',
    //             });
    //         }
    //     }


}

module.exports = suspiciousIPHandler;