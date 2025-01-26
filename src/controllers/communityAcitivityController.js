const fs = require('fs');
const path = require('path');
const { CommunityActivity , Tag , Comment , Category} = require('../database/models');
const LogActivityHandler = require('../Helpers/logActivityHandler');
const appConst = require('../appConst');
let moment = require('moment');
module.exports = {

    add : async (request , response ) =>{
        try{

            let thumbnailDetail = request.file;
            let thumbnailFileName = thumbnailDetail.filename;
            let categoryId = request.body.categoryId;
            let title = request.body.title;
            let userId =request.body.userId;
            let tags = request.body.tags;
            let description = request.body.description;
            let communityActivity = await CommunityActivity.create({
                category_id :categoryId,
                added_by : userId,
                title : title,
                image : thumbnailFileName,
                description : description
            })

            let tagList = tags.map(tag => {
                return {
                    tagable_type : 'CommunityActivity',
                    tagable_id :  communityActivity.id,
                    title : tag
                }    
            })

            await Tag.bulkCreate(tagList);

            await LogActivityHandler(
                request.body.userId,
                'Post created', // title
                'Add', //action
                `Post added with tags and details`, //information
            );

            return response.status(200).json({
                status: true,
                message: 'Post added successfully',
            })



        } catch (error){
            return response.status(500).json({
                status: false,
                message: 'Something Went Wrong',
                error: error.message
            });
        }
    },

    edit : async (request , response ) =>{
        try{
            const activityThumbnailPath = path.join(__dirname , '..' , 'public' , 'uploads' ,'thumbnail' );

            let postId = request.body.id;

            await Tag.destroy({
                where : {
                    tagable_type : 'CommunityActivity',
                    tagable_id : postId
                }
            });

            let postDetail = await CommunityActivity.findOne({
                where : {
                    id : postId
                }
             });

            if(request.file){
                if(postDetail.image && fs.existsSync(`${activityThumbnailPath}/${postDetail.image}`)){
                    fs.unlinkSync(`${activityThumbnailPath}/${postDetail.image}`);
                }
            }

            
            let description = request.body.description;
            
            let dataToUpdate = {
                category_id : request.body.categoryId,
                title : request.body.title,
                description : description
            }

            if(request.file){
                let thumbnailDetail = request.file;
                dataToUpdate.image = thumbnailDetail.filename
            }

            let tags = request.body.tags;

            await CommunityActivity.update(
                                        dataToUpdate,
                                        { where :  {id : postId} },
                                    );

            let tagList = tags.map(tag => {
                return {
                    tagable_type : 'CommunityActivity',
                    tagable_id :  postId,
                    title : tag
                }    
            })

            await Tag.bulkCreate(tagList);

            await LogActivityHandler(
                request.body.userId,
                'Post updated', // title
                'Update', //action
                `Post updated with tags and details`, //information
            );

            return response.status(200).json({
                status: true,
                message: 'Post updated successfully',
            })



        } catch (error){
            return response.status(500).json({
                status: false,
                message: 'Something Went Wrong',
                error: error.message
            });
        }
    },

    delete : async (request , response ) => {
        try{

            let postId = request.body.id;
            console.log(postId);
            const activityThumbnailPath = path.join(__dirname,'..','public','uploads','thumbnail' );

            await Tag.destroy({
                        where : {
                            tagable_type : 'CommunityActivity',
                            tagable_id : postId
                        }
            });

            let postDetail = await CommunityActivity.findOne({
                                        where : {
                                            id : postId
                                        }
                                    });


             if(postDetail.image){
                if(fs.existsSync(`${activityThumbnailPath}/${postDetail.image}`)){
                    fs.unlinkSync(`${activityThumbnailPath}/${postDetail.image}`);
                }
            }

            await CommunityActivity.destroy({
                where : {
                    id : postId
                }
            })

            await LogActivityHandler(
                request.body.userId,
                'Post deleted', // title
                'Delete', //action
                `delete post`, //information
            );

            return response.status(200).json({
                status : true, 
                message : 'Post deleted successfully'
            });

        } catch (error){
            return response.status(500).json({
                status: false,
                message: 'Something Went Wrong',
                error: error.message
            });
        }
    },

    list : async (request , response) => {
        try{
            let status = request.body.status;

            whereCondition = {}
            if(status){
                whereCondition.status = status;
            }
            let skip = (parseInt(request.body.pageNo) - 1) * 10;
            const posts = await CommunityActivity.findAll({
                include : [
                    {
                        model : Tag,
                        required : false,
                        as : 'tags'
                    },
                    {
                        model : Comment,
                        required : false,
                        as : 'comments'
                    },
                    {
                        model : Category,
                        required : false,
                        as : 'category'
                    },
                ],
                where : whereCondition,
                offset : skip,
                limit: 10,
            });

            return response.status(200).json({
                status : true,
                data : posts
            })

        } catch (error){
            return response.status(500).json({
                status: false,
                message: 'Something Went Wrong',
                error: error.message
            });
        }
    },


    changeStatus :  async (request , response) => {
        try{
            let postId = request.body.postId;
            let status  = request.body.status;
            await CommunityActivity.update(
                { 
                        status : status
                },
                { 
                    where : {
                        id : postId
                    }
                },
            )


            await LogActivityHandler(
                request.body.userId,
                'Status Update', // title
                'Update', //action
                `Post Status Updated`, //information
            );

            return response.status(200).json({
                status: true,
                message: 'Post Status updated successfully',
            })


        } catch (error){
            return response.status(500).json({
                status: false,
                message: 'Something Went Wrong',
                error: error.message
            });
        }
    },

    changeApproval :   async (request , response) => {
        try{
            let postId = request.body.postId;
            let approvalStatus  = request.body.approvalStatus;
            await CommunityActivity.update(
                { is_approved : approvalStatus },
                { 
                    where : {
                        id : postId
                    }
                },
            );

            await LogActivityHandler(
                request.body.userId,
                'Approval Update', // title
                'Update', //action
                `Approval Status Updated`, //information
            );

            return response.status(200).json({
                status: true,
                message: 'Approval status updated successfully',
            })


        } catch (error){
            return response.status(500).json({
                status: false,
                message: 'Something Went Wrong',
                error: error.message
            });
        }
    },


    updateRestriction : async ( request , response ) =>{
        try{
            let postId = request.body.postId;
            let restrictionType  = request.body.restrictionType;
            let restrictionTime = request.body.restrictionTime;

            let updateChanges = { status : restrictionType };
            if(restrictionTime){
                updateChanges.action_time = moment().add( restrictionTime , 'hours' ).format('YYYY-MM-DD HH:mm:ss');
            }

            await CommunityActivity.update(
                updateChanges,
                { 
                    where : {
                        id : postId
                    }
                },
            )

            return response.status(200).json({
                status: true,
                message: 'Restriction updated successfully',
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
