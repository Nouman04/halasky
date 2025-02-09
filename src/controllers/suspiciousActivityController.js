const { SuspiciousActivity , User } = require('../database/models');
const { Op } = require('sequelize');

module.exports = {
    getIps : async (request, response) => {
        try{
            console.log(request.body);
            let skip = (parseInt(request.body.pageNo) - 1) * 10;
            let status = request.body.status;
            let ip = request.body.ip;
            console.log(skip , status , ip);

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
    }
   
}