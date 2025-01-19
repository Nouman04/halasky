const SuspiciousAcitivity = require('../database/models/SuspiciousAcitivity');
const Op = require('sequelize');

module.exports = {
    getActivities : async (request, response) => {
        try{

            let skip = (parseInt(request.body.pageNo) - 1) * 10;
            let userId = request.body.userId;
            let status = request.body.status;
            let ipAddress = request.body.ipAddress;
            let whereCondition = {};
    
            if(userId){
                whereCondition.user_id = userId
            }
            
            if(status){
                whereCondition.status = status;
            }
    
            if(ipAddress){
                whereCondition.ipAddress = {[Op.like] : `%${ipAddress}%`}
            }
            
            let suspiciouActivitiesList = await SuspiciousAcitivity.findAll({
                                                include : {
                                                    model : User,
                                                    as: 'user',
                                                    required : false
                                                },
                                                where : whereCondition,
                                                offset: skip,
                                                limit : 10,
    
                                        });
            return response.status(200).json({
                status: true,
                data : suspiciouActivitiesList
            });

        } catch (error){
            return response.status(500).json({
                status: false,
                message: 'Something Went Wrong',
                error: error.message
            });
        }

    }, 
    
    updateActivityStatus : async (request , response ) => {
        try{
            let status = request.body.status;
            let id = request.body.id;
            await SuspiciousAcitivity.update(
                {where : { id : id}},
                {status : status}
        );
        } catch (error){
            return response.status(500).json({
                status: false,
                message: 'Something Went Wrong',
                error: error.message
            });
        }
    }
}