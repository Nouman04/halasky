const Comment = require('../database/models/Comment');
const Violation = require('../database/models/Violation')

module.exports = {

    

    addComment : async (request , response) => {
        try{
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


    deleteComment: async (request, response) => {
        try {
            const commentId = request.body.commentId;
    
            await Comment.destroy({
                where: {
                    id: commentId,
                },
            });
    
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
            let userId = request.body.userId;
            let addedBy = request.body.addedBy;
            let violationableType  = request.body.type;
            let  violationableId= request.body.id;
            let reason = request.body.reason;
            await Violation.create({
                            violationable_id : violationableId,
                            violationable_type : violationableType,
                            reason: reason,
                            added_by: addedBy,
                            user_id : userId
                        });

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
            let userId = request.body.userId;
            let violationableType  = request.body.type;
            let  violationableId= request.body.id;
            let reason = request.body.reason;
            let violationId = request.body.violation_id
            await Violation.update({
                            violationable_id : violationableId,
                            violationable_type : violationableType,
                            reason: reason,
                            added_by: addedBy,
                            user_id : userId
                        },
                        {
                            where : {id : violationId}
                        } 
                        
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


    list : async ( request , response ) => {
        try{
           let skip = (parseInt(request.body.pageNo) - 1) * 10;
           let userId = request.body.userId;
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
    
            await Violation.destroy({
                where: {
                    id: violationId,
                },
            });
    
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
