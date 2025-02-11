const fs = require("fs");
const path = require("path");
const { Blog } = require("../database/models");
const { Tag } = require("../database/models");
const { Comment } = require("../database/models");
const mutateHtmlContent = require("../Helpers/mutateHtmlContent");
const { dynamicUploader } = require("../Helpers/fileUploadHelper");
const { isEmpty, isInt, isBoolean, isLength, isArray } = require("validator");
const { fail } = require("assert");

module.exports = {
  add: async (request, response) => {
    try {
      const blogImagesPath = path.join(
        __dirname,
        "..",
        "public",
        "uploads",
        "blogs"
      );
      const blogThumbnailPath = path.join(
        __dirname,
        "..",
        "public",
        "thumbnail"
      );
      const upload = dynamicUploader(blogThumbnailPath);

      let { categoryId, title, userId, isPublished, tags } = request.body;

      if (!title || isEmpty(title)) {
        return response.status(400).json({
          status: fail,
          message: "Blog Title is required! ",
        });
      }

      if (!categoryId || !isInt(categoryId.toString())) {
        return response.status(400).json({
          status: fail,
          message: "Valid categoryId is required.",
        });
      }

      if (!userId || !isInt(userId.toString())) {
        return response.status(400).json({
          status: false,
          message: "Valid userId is required.",
        });
      }

      if (
        isPublished !== undefined &&
        isPublished !== null &&
        !isBoolean(isPublished.toString())
      ) {
        return response.status(400).json({
          status: false,
          message: "isPublished must be a boolean value.",
        });
      }

      let content = mutateHtmlContent(request.body.content, blogImagesPath);
      let thumbnailUpload = upload.single("thumbnail");
      await new Promise((resolve, reject) => {
        thumbnailUpload(request, response, (err) => {
          if (err) {
            return reject(err);
          }

          resolve();
        });
      });

      if (!request.file) {
        return response.status(400).json({
          status: false,
          message: "Thumbnail image is required",
        });
      }

      let thumbnailDetail = request.file.find(
        (file) => file.fieldname === "thumbnail"
      );
      let thumbnailFileName = thumbnailDetail.fileName;
      let blog = await Blog.create({
        category_id: categoryId,
        created_by: userId,
        title: title,
        image: thumbnailFileName,
        is_published: isPublished,
        description: content,
      });

      let tagList = tags.map((tag) => {
        return {
          tagable_type: "Blog",
          tagable_id: blog.id,
          title: tag,
        };
      });

      await Tag.bulkInsert(tagList);

      return response.status(200).json({
        status: true,
        message: "Blog added successfully",
      });
    } catch (error) {
      return response.status(500).json({
        status: false,
        message: "Something Went Wrong",
        error: error.message,
      });
    }
  },

  edit: async (request, response) => {
    try {
      const blogImagesPath = path.join(
        __dirname,
        "..",
        "public",
        "uploads",
        "blogs"
      );
      const blogThumbnailPath = path.join(
        __dirname,
        "..",
        "public",
        "thumbnail"
      );
      const upload = dynamicUploader(blogThumbnailPath);
      let blogId = request.body.id;

      if (!blogId || !isInt(blogId.toString())) {
        return response.status(400).json({
          status: false,
          message: "Valid blogId is required.",
        });
      }

      if (!request.body.title || isEmpty(request.body.title)) {
        return response.status(400).json({
          status: false,
          message: "Blog Title is required.",
        });
      }

      if (
        request.body.categoryId &&
        !isInt(request.body.categoryId.toString())
      ) {
        return response.status(400).json({
          status: false,
          message: "Valid categoryId is required.",
        });
      }

      if (
        request.body.isPublished &&
        !isBoolean(request.body.isPublished.toString())
      ) {
        return response.status(400).json({
          status: false,
          message: "isPublished must be a boolean value.",
        });
      }

      await Tag.destroy({
        where: {
          tagable_type: "Blog",
          tagable_id: blogId,
        },
      });

      let blogDetail = await Blog.findOne({
        where: {
          id: blogId,
        },
      });

      if (request.file && request.file.thumbnail) {
        if (fs.existsSync(`${blogImagesPath}/${blogDetail.image}`)) {
          fs.unlinkSync(`${blogImagesPath}/${blogDetail.image}`);

          let thumbnailUpload = upload.single("thumbnail");
          await new Promise((resolve, reject) => {
            thumbnailUpload(request, response, (err) => {
              if (err) {
                return reject(err);
              }

              resolve();
            });
          });
        }
      }

      let content = mutateHtmlContent(request.body.content, blogImagesPath);

      let dataToUpdate = {
        category_id: request.body.categoryId,
        title: request.body.title,
        is_published: request.body.isPublished,
        description: content,
      };

      if (request.file && request.file.thumbnail) {
        let thumbnailDetail = request.file.find(
          (file) => file.fieldname === "thumbnail"
        );
        dataToUpdate.image = thumbnailDetail.fileName;
      }

      let tags = request.body.tags;

      let blog = await Blog.update(dataToUpdate, { where: { id: blogId } });

      let tagList = tags.map((tag) => {
        return {
          tagable_type: "Blog",
          tagable_id: blogId,
          title: tag,
        };
      });

      await Tag.bulkInsert(tagList);

      return response.status(200).json({
        status: true,
        message: "Blog updated successfully",
      });
    } catch (error) {
      return response.status(500).json({
        status: false,
        message: "Something Went Wrong",
        error: error.message,
      });
    }
  },

  delete: async (request, response) => {
    try {
      let blogId = request.body.id;

      if (!blogId || !isInt(blogId.toString())) {
        return response.status(400).json({
          status: "fail",
          message: "Valid blogId is required.",
        });
      }

      const blogImagesPath = path.join(
        __dirname,
        "..",
        "public",
        "uploads",
        "blogs"
      );

      await Tag.destroy({
        where: {
          tagable_type: "Blog",
          tagable_id: blogId,
        },
      });

      let blogDetail = await Blog.findOne({
        where: {
          id: blogId,
        },
      });

      if (blogDetail.image) {
        if (fs.existsSync(`${blogImagesPath}/${blogDetail.image}`)) {
          fs.unlinkSync(`${blogImagesPath}/${blogDetail.image}`);
        }
      }

      await Blog.delete({
        where: {
          id: blogId,
        },
      });
    } catch (error) {
      return response.status(500).json({
        status: false,
        message: "Something Went Wrong",
        error: error.message,
      });
    }
  },

  list: async (request, response) => {
    try {
      let status = request.body.status;

      if (typeof status !== "boolean") {
        return response.status(400).json({
          status: false,
          message: "Status must be a boolean value.",
        });
      }

      if (!pageNo || !isInt(pageNo.toString(), { min: 1 })) {
        return response.status(400).json({
          status: false,
          message: "Page number must be a positive integer.",
        });
      }

      whereCondition = {};
      if (status) {
        whereCondition.status = status;
      }
      let skip = (parseInt(request.body.pageNo) - 1) * 10;
      const blogs = await Blog.findAll({
        include: [
          {
            model: Tag,
            required: false,
          },
          {
            model: Comment,
            required: false,
          },
          {
            model: Category,
          },
        ],
        where: whereCondition,
        offset: skip,
        limit: 10,
      });

      return response.status(200).json({
        status: true,
        data: blogs,
      });
    } catch (error) {
      return response.status(500).json({
        status: false,
        message: "Something Went Wrong",
        error: error.message,
      });
    }
  },

  changeStatus: async (request, response) => {
    try {
      let { blogId, status } = request.body;

      if (!blogId || !isInt(blogId.toString())) {
        return response.status(400).json({
          status: false,
          message: "Valid blogId is required.",
        });
      }

      await Blog.update(
        {
          is_published: status,
        },
        {
          where: {
            id: blogId,
          },
        }
      );

      await LogActivityHandler(
        request.body.userId,
        "Blog status", // title
        "Update", //action
        "change blog status" //information
      );

      return response.status(200).json({
        status: true,
        message: "Blog updated successfully",
      });
    } catch (error) {
      return response.status(500).json({
        status: false,
        message: "Something Went Wrong",
        error: error.message,
      });
    }
  },

  addComment: async (request, response) => {
    try {
      let { blogId, userId, comment } = request.body;

      if (!blogId || !isInt(blogId.toString())) {
        return response.status(400).json({
          status: false,
          message: "Valid blogId is required.",
        });
      }

      if (!userId || !isInt(userId.toString())) {
        return response.status(400).json({
          status: false,
          message: "Valid userId is required.",
        });
      }

      if (!comment || isEmpty(comment.trim())) {
        return response.status(400).json({
          status: false,
          message: "Comment is required.",
        });
      }

      await Comment.create({
        commentable_id: blogId,
        commentable_type: "Blog",
        comment: comment,
        added_by: userId,
      });

      return response.status(200).json({
        status: true,
        message: "Comment added successfully",
      });
    } catch (error) {
      return response.status(500).json({
        status: false,
        message: "Something Went Wrong",
        error: error.message,
      });
    }
  },
};
