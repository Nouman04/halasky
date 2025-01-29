const {Comment , Violation , User}= require('../database/models');
const LogActivityHandler = require('../Helpers/logActivityHandler');

module.exports = {

    addComment : async (request , response) => {
        try{
            console.log(request.body);
            let id = request.body.id;
            let userId = request.body.userId;
            let comment  = request.body.comment;
            let commentType = request.body.type
            await Comment.create({
                            commentable_id : id,
                            commentable_type : commentType,
                            comment: comment,
                            added_by: userId 
                        });


            await LogActivityHandler(
                request.body.userId,
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
                request.body.userId,
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
                request.body.userId,
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
            let addedBy = request.body.userId;
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
                request.body.userId,
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
                request.body.userId,
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
                request.body.userId,
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




}
