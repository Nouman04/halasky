const { SuspiciousActivity , User , LogActivity } = require('../database/models');
const { Op } = require('sequelize');
const {validateGetIpsSchema , validateUpdateIpSchema , validateSuspiciousLogActivitiesSchema} =require('../validations/suspiciousActivitiesValidation');

module.exports = {
    getIps : async (request, response) => {
        try{
            const { error } = validateGetIpsSchema.validate(request.body, { abortEarly: false });
        
            if (error) {
                return response.status(400).json({
                success: false,
                message: "Validation failed",
                details: error.details.map((d) => d.message),
                });
            }

            let skip = (parseInt(request.body.pageNo) - 1) * 10;
            let status = request.body.status;
            let ip = request.body.ip;

            let whereCondition = {};

            if(status){
                whereCondition.status = status;
            }

            if(ip){
                whereCondition.ip_address = { [Op.like]: `%${ip}%` };

            }

            let activities = await SuspiciousActivity.findAll({
                                where : whereCondition,
                                include : {
                                    model : User,
                                    required : false,
                                     as : 'user'
                                },
                                offset : skip,
                                limit : 10
                            });

            return response.status(200).json({
                status : true,
                data : activities
            })

        } catch (error){
            return response.status(500).json({
                status: false,
                message: 'Something Went Wrong',
                error: error.message
            });
        }

    }, 

    updateIp : async (request , response ) => {
        try{
            const { error } = validateUpdateIpSchema.validate(request.body, { abortEarly: false });
        
            if (error) {
                return response.status(400).json({
                success: false,
                message: "Validation failed",
                details: error.details.map((d) => d.message),
                });
            }
            const { id , status} = request.body;
            await SuspiciousActivity.update(
                { status : status},
                { where : { id }}
            )
            return response.status(200).json({
                status : true,
                message : 'Ip status updated successfully'
            })

        } catch (error){
            return response.status(500).json({
                status: false,
                message: 'Something Went Wrong',
                error: error.message
            });
        }
    }, 

    suspiciousLogActivities : async (request , response ) => {
         try{
            const { error } = validateSuspiciousLogActivitiesSchema.validate(request.body, { abortEarly: false });
        
            if (error) {
                return response.status(400).json({
                success: false,
                message: "Validation failed",
                details: error.details.map((d) => d.message),
                });
            }
            let skip = (parseInt(request.body.pageNo) - 1) * 10;

            let whereCondition = {
                title: {
                    [Op.in]: ["login failed", "Suspicious Activity"], 
                },
            };

            
            const logs = await LogActivity.findAll({
                where: whereCondition,
                order: [["created_at", "DESC"]],
                offset: skip,
                limit: 10,
            });

            return response.status(200).json({
                status : true,
                data : logs
            })

        } catch (error){
            return response.status(500).json({
                status: false,
                message: 'Something Went Wrong',
                error: error.message
            });
        }
    }
   
}