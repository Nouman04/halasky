const fs = require('fs');
const path = require('path')
const Blog = require('../database/models/Blog');
const Tag = require('../database/models/Tag');
const Comment = require('../database/models/Comment');
const mutateHtmlContent = require('../Helpers/mutateHtmlContent');
const {dynamicUploader} = require('../Helpers/fileUploadHelper');
const LogActivityHandler = require('../Helpers/logActivityHandler');

module.exports = {

    add : async (request , response ) =>{
        try{
            const blogImagesPath = path.join(__dirname,'..','public','uploads','blogs' );
            const blogThumbnailPath = path.join(__dirname , '..' , 'public' , 'thumbnail' );
            const upload = dynamicUploader(blogThumbnailPath);
            
            let content = mutateHtmlContent(request.body.content , blogImagesPath);
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
            let isPublished = request.body.isPublished;
            let tags = request.body.tags;
            let blog = await Blog.create({
                category_id :categoryId,
                created_by : userId,
                title : title,
                image : thumbnailFileName,
                is_published : isPublished,
                description : content
            })

            let tagList = tags.map(tag => {
                return {
                    tagable_type : 'Blog',
                    tagable_id :  blog.id,
                    title : tag
                }    
            })

            await Tag.bulkInsert(tagList);

            await LogActivityHandler(
                request.body.userId,
                'Blog request', // title
                'Add', //action
                'Add blog and detail', //information
            );

            return response.status(200).json({
                status: true,
                message: 'Blog added successfully',
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
            const blogImagesPath = path.join(__dirname,'..','public','uploads','blogs' );
            const blogThumbnailPath = path.join(__dirname , '..' , 'public' , 'thumbnail' );
            const upload = dynamicUploader(blogThumbnailPath);
            let blogId = request.body.id;
    
            await Tag.delete({
                where : {
                    tagable_type : 'Blog',
                    tagable_id : blogId
                }
            });

            let blogDetail = await Blog.findOne({
                where : {
                    id : blogId
                }
             });

            if(request.file && request.file.thumbnail){
                if(fs.existsSync(`${blogImagesPath}/${blogDetail.image}`)){
                    fs.unlinkSync(`${blogImagesPath}/${blogDetail.image}`);

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
            }

            
            let content = mutateHtmlContent(request.body.content , blogImagesPath);
            
            let dataToUpdate = {
                category_id : request.body.categoryId,
                title : request.body.title,
                is_published : request.body.isPublished,
                description : content
            }

            if(request.file && request.file.thumbnail){
                let thumbnailDetail = request.file.find( file => file.fieldname === 'thumbnail');
                dataToUpdate.image = thumbnailDetail.fileName
            }

            let tags = request.body.tags;

            let blog = await Blog.update(
                dataToUpdate, 
                { where :  {id : blogId }},
            );

            let tagList = tags.map(tag => {
                return {
                    tagable_type : 'Blog',
                    tagable_id :  blogId,
                    title : tag
                }    
            })

            await Tag.bulkInsert(tagList);

            await LogActivityHandler(
                request.body.userId,
                'Update blog request', // title
                'Update', //action
                'change blog information', //information
            );

            return response.status(200).json({
                status: true,
                message: 'Blog updated successfully',
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

            let blogId = request.body.id;
            const blogImagesPath = path.join(__dirname,'..','public','uploads','blogs' );

            await Tag.delete({
                        where : {
                            tagable_type : 'Blog',
                            tagable_id : blogId
                        }
            });

            let blogDetail = await Blog.findOne({
                where : {
                    id : blogId
                }
             });


             if(blogDetail.image){
                if(fs.existsSync(`${blogImagesPath}/${blogDetail.image}`)){
                    fs.unlinkSync(`${blogImagesPath}/${blogDetail.image}`);
                }
            }

            await Blog.delete({
                where : {
                    id : blogId
                }
            });

            await LogActivityHandler(
                request.body.userId,
                'Delete blog', // title
                'Delete', //action
                'delete blog request', //information
            );

            return response.status(200).json({
                status : true,
                message : 'blog deleted successfully'
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
            const blogs = await Blog.findAll({
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
                data : blogs
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
            let blogId = request.body.blogId;
            let status  = request.body.status;
            await Blog.update(
                { 
                        is_published : status
                },
                { 
                    where : {
                        id : blogId
                    }
                },
            )

            await LogActivityHandler(
                request.body.userId,
                'Blog status', // title
                'Update', //action
                'change blog status', //information
            );

            return response.status(200).json({
                status: true,
                message: 'Blog updated successfully',
            })


        } catch (error){
            return response.status(500).json({
                status: false,
                message: 'Something Went Wrong',
                error: error.message
            });
        }
    },

}
