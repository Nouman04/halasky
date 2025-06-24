const {Comment , Violation , User, Category , Promotion}= require('../database/models');
const LogActivityHandler = require('../Helpers/logActivityHandler');
const moment = require('moment');

module.exports = {

    addComment : async (request , response) => {
        try{
            console.log(request.body);
            let id = request.body.id;
            let userId = request.user.id;
            let comment  = request.body.comment;
            let commentType = request.body.type
            await Comment.create({
                            commentable_id : id,
                            commentable_type : commentType,
                            comment: comment,
                            added_by: userId 
                        });


            await LogActivityHandler(
                request.user.id,
                'Comment', // title
                'Add', //action
                `Add ${commentType} comment`, //information
            );

            return response.status(200).json({
                status: true,
                message: 'Comment added successfully',
            })


        } catch (error){
            return response.status(500).json({
                status: false,
                message: 'Something Went Wrong',
                error: error.message
            });
        }
    },


    updateComment : async (request , response) => {
        try{
            let id = request.body.id;
            let comment  = request.body.comment;
            let commentDetail = await Comment.findOne({where : {id : id}});
            await Comment.update(
                        {
                            comment: comment,
                        },
                        { where : {id : id}}
                    );


            await LogActivityHandler(
                request.user.id,
                'Comment', // title
                'Update', //action
                `Update ${commentDetail.commentable_type} comment`, //information
            );

            return response.status(200).json({
                status: true,
                message: 'Comment updated successfully',
            })


        } catch (error){
            return response.status(500).json({
                status: false,
                message: 'Something Went Wrong',
                error: error.message
            });
        }
    },


    deleteComment: async (request, response) => {
        try {
            const commentId = request.body.commentId;

            const commentDetail = Comment.findOne({
                where : {id : commentId}
            });
            const commentType = commentDetail.commentable_type;
            await Comment.destroy({
                where: {
                    id: commentId,
                },
            });

            await LogActivityHandler(
                request.user.id,
                'Comment', // title
                'Delete', //action
                `delete ${commentType} comment`, //information
            );
    
            return response.status(200).json({
                status: true,
                message: 'Comment deleted successfully',
            });
    
        } catch (error) {
            return response.status(500).json({
                status: false,
                message: 'Something Went Wrong',
                error: error.message,
            });
        }
    },
    

    

    addViolation : async (request , response ) =>{
        try{
            let personId = request.body.personId;
            let addedBy = request.user.id;
            let violationableType  = request.body.type;
            let  violationableId= request.body.id;
            let reason = request.body.reason;
            await Violation.create({
                            violationable_id : violationableId,
                            violationable_type : violationableType,
                            reason: reason,
                            added_by: addedBy,
                            user_id : personId
                        });
            await LogActivityHandler(
                request.user.id,
                'Violation', // title
                'Add', //action
                `add ${violationableType} violation`, //information
            );

            return response.status(200).json({
                status: true,
                message: 'Violation added successfully',
            })


        } catch (error){
            return response.status(500).json({
                status: false,
                message: 'Something Went Wrong',
                error: error.message
            });
        }
    },



    updateViolation : async (request , response ) =>{
        try{
            let reason = request.body.reason;
            let violationId = request.body.violationId;
            let violationDetail = await Violation.findOne({
                where : {id : violationId}
            });


            await Violation.update({
                            reason: reason,
                        },
                        {
                            where : {id : violationId}
                        } 
                    );

            await LogActivityHandler(
                request.user.id,
                'Violation', // title
                'Update', //action
                `Update ${violationDetail.violationable_type} violation`, //information
            );

            return response.status(200).json({
                status: true,
                message: 'Violation updated successfully',
            })


        } catch (error){
            return response.status(500).json({
                status: false,
                message: 'Something Went Wrong',
                error: error.message
            });
        }
    },


    listViolation : async ( request , response ) => {
        try{
           let skip = (parseInt(request.body.pageNo) - 1) * 10;
           let userId = request.body.personId;
           let addedBy = request.body.addedBy
           let violationType = request.body.type;

           let whereCondition = {};
           if(userId){
                whereCondition.user_id = userId;
           }

           if(addedBy){
                whereCondition.added_by = addedBy;
           }

           if(violationType){
                whereCondition.violationable_type = violationType;
           }
            
           let violations = await Violation.findAll({
                    include : [
                                {
                                    model: User, 
                                    as: 'addedBy', 
                                },
                                {
                                    model: User, 
                                    as: 'user', 
                                },
                            ],
                            where : whereCondition,
                            offset : skip,
                            limit: 10,
           })


            return response.status(200).json({
                status: true,
                data: violations,
            })


        } catch (error){
            return response.status(500).json({
                status: false,
                message: 'Something Went Wrong',
                error: error.message
            });
        }
    },



    deleteViolation: async (request, response) => {
        try {
            const violationId = request.body.violationId;
            
            const violationDetail = Violation.findOne({
                where : {id : violationId}
            })

            console.log(violationDetail);

            const violationableType = violationDetail.type
            await Violation.destroy({
                where: {
                    id: violationId,
                },
            });

            await LogActivityHandler(
                request.user.id,
                'Delete Violation', // title
                'delete', //action
                `delete ${violationableType} violation`, //information
            );
    
            return response.status(200).json({
                status: true,
                message: 'Violation deleted successfully',
            });
    
        } catch (error) {
            return response.status(500).json({
                status: false,
                message: 'Something Went Wrong',
                error: error.message,
            });
        }

        
    },

    categories: async (request, response) => {
        try {
            const categories = await Category.findAll();
    
            return response.status(200).json({
                status: true,
                data: categories,
            });
    
        } catch (error) {
            return response.status(500).json({
                status: false,
                message: 'Something Went Wrong',
                error: error.message,
            });
        }

    },

    addPromotionCode : async (request ,response ) => {
        try {
            await Promotion.create({
                promotion_name: request.body.promotion_name,
                applicable_service : request.body.applicable_service, // 'flight' , 'hotel' , 'both'
                promotion_type: request.body.promotion_type, // 'Fixed' or 'percentage'
                code: request.body.code,
                percentage: request.body.percentage || null,
                fixed_amount: request.body.fixed_amount || null,
                applicable_from: request.body.applicable_from,
                applicable_to: request.body.applicable_to,
                condition: request.body.condition, // minimum or none
                amount: request.body.amount || null,
                total_promo: request.body.total_promo,
                used_promo: 0,
                created_by : request.user.id
            });

            return response.status(200).json({
                status: true,
                message: 'Promotion created successfully',
            });
    
        } catch (error) {
            return response.status(500).json({
                status: false,
                message: 'Something Went Wrong',
                error: error.message,
            });
        }
    },


    updatePromotionCode : async (request ,response ) => {
        try {

            const currentPromotion = await Promotion.findByPk(request.body.id);

            if (
                request.body.total_promo !== undefined &&
                currentPromotion.used_promo !== null &&
                Number(request.body.total_promo) < currentPromotion.used_promo
            ) {
            return response.status(400).json({
                status: false,
                message: `Total promo (${request.body.total_promo}) cannot be less than used promo (${currentPromotion.used_promo}).`,
            });
            }

            await Promotion.update({
                promotion_name: request.body.promotion_name,
                applicable_service : request.body.applicable_service, // 'flight' , 'hotel' , 'both'
                promotion_type: request.body.promotion_type, // 'Fixed' or 'percentage'
                code: request.body.code,
                percentage: request.body.percentage || null,
                fixed_amount: request.body.fixed_amount || null,
                applicable_from: request.body.applicable_from,
                applicable_to: request.body.applicable_to,
                condition: request.body.condition, // minimum or none
                amount: request.body.amount || null,
                total_promo: request.body.total_promo,
            } , { where : {id : request.body.id}});

            return response.status(200).json({
                status: true,
                message: 'Promotion updated successfully',
            });
    
        } catch (error) {
            return response.status(500).json({
                status: false,
                message: 'Something Went Wrong',
                error: error.message,
            });
        }
    },

    getPromotionCode : async (request , response ) => {
        try {

            const code = request.params.code;
            const promotion = await Promotion.findOne({ where: { code : code } });

            if (!promotion) {
                return response.status(200).json({
                    status: true,
                    message: 'not found',
                });
            }

            
            const isExpiredByUsage =
                promotion.total_promo !== null &&
                promotion.used_promo !== null &&
                promotion.used_promo >= promotion.total_promo;

           const today = moment();
           const isExpiredByDate =
                !moment(promotion.applicable_from).isSameOrBefore(today, 'day') ||
                !moment(promotion.applicable_to).isSameOrAfter(today, 'day');


            const isExpired = isExpiredByUsage || isExpiredByDate;
            promoStatus = isExpired ? 'expired' : 'active';
     
            if(promoStatus == 'expired'){
                return response.status(200).json({
                    status: true,
                    message: 'Promotion expired',
                });
            } else {
                return response.status(200).json({
                    status: true,
                    data: promotion,
                });
            }

    
        } catch (error) {
            return response.status(500).json({
                status: false,
                message: 'Something Went Wrong',
                error: error.message,
            });
        }
    },

    deletePromoCode : async (request , response ) => {
        try {

            const id = request.body.id;
            await Promotion.destroy({
                where: {
                    id: id,
                },
            });

            
            return response.status(200).json({
                status: true,
                message: 'Promotion deleted successfully',
            });

    
        } catch (error) {
            return response.status(500).json({
                status: false,
                message: 'Something Went Wrong',
                error: error.message,
            });
        }
    }

}
