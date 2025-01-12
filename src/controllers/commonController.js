const Comment = require('../database/models/Comment');

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
    }

}
