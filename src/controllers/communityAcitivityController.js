const fs = require('fs');
const path = require('path')
const CommunityActivity = require('../database/models/CommunityActivity');
const Tag = require('../database/models/Tag');
const {dynamicUploader} = require('../Helpers/fileUploadHelper');
const appConst = require('../appConst');
let moment = require('moment');
module.exports = {

    add : async (request , response ) =>{
        try{
            const activityThumbnailPath = path.join(__dirname , '..' , 'public' , 'thumbnail' );
            const upload = dynamicUploader(activityThumbnailPath);
            
            let thumbnailUpload = upload.single('thumbnail');
            await new Promise((resolve , reject) => {
                thumbnailUpload(request , response , (err) => {
                    if(err) {
                        return reject(err);
                    } 

                    resolve();
                })
            });

            let thumbnailDetail = request.file.find( file => file.fieldname === 'thumbnail');
            let thumbnailFileName = thumbnailDetail.fileName;
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

            await Tag.bulkInsert(tagList);

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
            const activityThumbnailPath = path.join(__dirname , '..' , 'public' , 'thumbnail' );
            const upload = dynamicUploader(activityThumbnailPath);
            let postId = request.body.id;
    
            await Tag.delete({
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

            if(request.file && request.file.thumbnail){

                if(postDetail.image && fs.existsSync(`${activityThumbnailPath}/${postDetail.image}`)){
                    fs.unlinkSync(`${activityThumbnailPath}/${postDetail.image}`);
                }
                let thumbnailUpload = upload.single('thumbnail');
                await new Promise((resolve , reject) => {
                    thumbnailUpload(request , response , (err) => {
                        if(err) {
                            return reject(err);
                        } 

                        resolve();
                    })
                });
                
            }

            
            let description = request.body.description;
            
            let dataToUpdate = {
                category_id : request.body.categoryId,
                title : request.body.title,
                description : description
            }

            if(request.file && request.file.thumbnail){
                let thumbnailDetail = request.file.find( file => file.fieldname === 'thumbnail');
                dataToUpdate.image = thumbnailDetail.fileName
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

            await Tag.bulkInsert(tagList);

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
            const activityThumbnailPath = path.join(__dirname,'..','public','uploads','blogs' );

            await Tag.delete({
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

            await CommunityActivity.delete({
                where : {
                    id : postId
                }
            })



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
                        required : false
                    },
                    {
                        model : Comment,
                        required : false
                    },
                    {
                        model : Category
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

            return response.status(200).json({
                status: true,
                message: 'Status updated successfully',
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
            )

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
            let approvalStatus  = request.body.restrictionType;
            let restrictionTime = request.body.restrictionTime;

            let updateChanges = { status : approvalStatus };
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
