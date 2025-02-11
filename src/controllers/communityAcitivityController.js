const fs = require("fs");
const path = require("path");
const { CommunityActivity } = require("../database/models");
const { Category } = require("../database/models");
const { Comment } = require("../database/models");
const { Tag } = require("../database/models");
const { dynamicUploader } = require("../Helpers/fileUploadHelper");
const appConst = require("../appConst");
const { isEmpty, isInt, isBoolean, isLength, isArray } = require("validator");
let moment = require("moment");
module.exports = {
  add: async (request, response) => {
    try {
      let { categoryId, userId, title, tags, description } = request.body;

      if (!categoryId || !isInt(categoryId.toString())) {
        return response.status(400).json({
          status: false,
          message: "Valid categoryId is required.",
        });
      }

      if (!userId || !isInt(userId.toString())) {
        return response.status(400).json({
          status: false,
          message: "Valid userId is required.",
        });
      }

      if (!title || isEmpty(title.trim())) {
        return response.status(400).json({
          status: false,
          message: "Title is required.",
        });
      }

      if (!tags || !Array.isArray(tags)) {
        return response.status(400).json({
          status: false,
          message: "Tags must be an array.",
        });
      }

      if (!description || isEmpty(description.trim())) {
        return response.status(400).json({
          status: false,
          message: "Description is required.",
        });
      }

      const activityThumbnailPath = path.join(
        __dirname,
        "..",
        "public",
        "thumbnail"
      );
      const upload = dynamicUploader(activityThumbnailPath);

      let thumbnailUpload = upload.single("thumbnail");
      await new Promise((resolve, reject) => {
        thumbnailUpload(request, response, (err) => {
          if (err) {
            return reject(err);
          }

          resolve();
        });
      });

      let thumbnailDetail = request.file.find(
        (file) => file.fieldname === "thumbnail"
      );
      let thumbnailFileName = thumbnailDetail.fileName;
      let communityActivity = await CommunityActivity.create({
        category_id: categoryId,
        added_by: userId,
        title: title,
        image: thumbnailFileName,
        description: description,
      });

      let tagList = tags.map((tag) => {
        return {
          tagable_type: "CommunityActivity",
          tagable_id: communityActivity.id,
          title: tag,
        };
      });

      await Tag.bulkInsert(tagList);

      return response.status(200).json({
        status: true,
        message: "Post added successfully",
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
      let { id, categoryId, title, tags, description } = request.body;

      if (!id || !isInt(id.toString())) {
        return response.status(400).json({
          status: false,
          message: "Valid postId is required.",
        });
      }

      if (categoryId && !isInt(categoryId.toString())) {
        return response.status(400).json({
          status: false,
          message: "Valid categoryId is required.",
        });
      }

      if (!title || isEmpty(title.trim())) {
        return response.status(400).json({
          status: false,
          message: "Title is required.",
        });
      }

      if (!description || isEmpty(description.trim())) {
        return response.status(400).json({
          status: false,
          message: "Description is required.",
        });
      }

      if (!tags || !Array.isArray(tags)) {
        return response.status(400).json({
          status: false,
          message: "Tags must be an array.",
        });
      }
      const activityThumbnailPath = path.join(
        __dirname,
        "..",
        "public",
        "thumbnail"
      );
      const upload = dynamicUploader(activityThumbnailPath);
      let postId = request.body.id;

      await Tag.destroy({
        where: {
          tagable_type: "CommunityActivity",
          tagable_id: postId,
        },
      });

      let postDetail = await CommunityActivity.findOne({
        where: {
          id: postId,
        },
      });

      // if (!postDetail) {
      //   return response.status(404).json({
      //     status: false,
      //     message: "Post not found.",
      //   });
      // }

      if (request.file && request.file.thumbnail) {
        if (
          postDetail.image &&
          fs.existsSync(`${activityThumbnailPath}/${postDetail.image}`)
        ) {
          fs.unlinkSync(`${activityThumbnailPath}/${postDetail.image}`);
        }
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

      let dataToUpdate = {
        category_id: request.body.categoryId,
        title: request.body.title,
        description: description,
      };

      if (request.file && request.file.thumbnail) {
        let thumbnailDetail = request.file.find(
          (file) => file.fieldname === "thumbnail"
        );
        dataToUpdate.image = thumbnailDetail.fileName;
      }

      await CommunityActivity.update(dataToUpdate, { where: { id: postId } });

      let tagList = tags.map((tag) => {
        return {
          tagable_type: "CommunityActivity",
          tagable_id: postId,
          title: tag,
        };
      });

      await Tag.bulkCreate(tagList);

      return response.status(200).json({
        status: true,
        message: "Post updated successfully",
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
      let postId = request.body.id;

      if (!postId || !isInt(postId.toString())) {
        return response.status(400).json({
          status: false,
          message: "Valid postId is required.",
        });
      }
      const activityThumbnailPath = path.join(
        __dirname,
        "..",
        "public",
        "uploads",
        "blogs"
      );

      await Tag.destroy({
        where: {
          tagable_type: "CommunityActivity",
          tagable_id: postId,
        },
      });

      let postDetail = await CommunityActivity.findOne({
        where: {
          id: postId,
        },
      });

      if (!postDetail) {
        return response.status(404).json({
          status: false,
          message: "Post not found.",
        });
      }

      if (postDetail.image) {
        if (fs.existsSync(`${activityThumbnailPath}/${postDetail.image}`)) {
          fs.unlinkSync(`${activityThumbnailPath}/${postDetail.image}`);
        }
      }

      await CommunityActivity.delete({
        where: {
          id: postId,
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
      let { status, pageNo } = request.body;

      if (!pageNo || !isInt(pageNo.toString()) || parseInt(pageNo) < 1) {
        return response.status(400).json({
          status: false,
          message: "Valid pageNo is required (must be a positive integer).",
        });
      }

      whereCondition = {};
      if (status) {
        whereCondition.status = status;
      }
      let skip = (parseInt(pageNo) - 1) * 10;
      const posts = await CommunityActivity.findAll({
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
        data: posts,
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
      let { postId, status } = request.body;

      if (
        status === undefined ||
        status === null ||
        ![0, 1].includes(parseInt(status))
      ) {
        return response.status(400).json({
          status: false,
          message: "Valid status is required (0 or 1).",
        });
      }

      let updatedRows = await CommunityActivity.update(
        { status: status },
        { where: { id: postId } }
      );

      // if (updatedRows[0] === 0) {
      //   return response.status(404).json({
      //     status: false,
      //     message: "Post not found.",
      //   });
      // }

      return response.status(200).json({
        status: true,
        message: "Status updated successfully",
      });
    } catch (error) {
      return response.status(500).json({
        status: false,
        message: "Something Went Wrong",
        error: error.message,
      });
    }
  },

  changeApproval: async (request, response) => {
    try {
      let { postId, approvalStatus } = request.body;

      if (!postId || !isInt(postId.toString())) {
        return response.status(400).json({
          status: false,
          message: "Valid postId is required.",
        });
      }

      let updatedRows = await CommunityActivity.update(
        { is_approved: approvalStatus },
        {
          where: {
            id: postId,
          },
        }
      );

      // if (updatedRows[0] === 0) {
      //   return response.status(404).json({
      //     status: false,
      //     message: "Post not found.",
      //   });
      // }

      return response.status(200).json({
        status: true,
        message: "Approval status updated successfully",
      });
    } catch (error) {
      return response.status(500).json({
        status: false,
        message: "Something Went Wrong",
        error: error.message,
      });
    }
  },

  updateRestriction: async (request, response) => {
    try {
      let postId = request.body.postId;
      let approvalStatus = request.body.approvalStatus;
      let restrictionTime = request.body.restrictionTime;

      if (!postId || !isInt(postId.toString())) {
        return response.status(400).json({
          status: false,
          message: "Valid postId is required.",
        });
      }

      let updateChanges = { status: approvalStatus };
      if (restrictionTime) {
        updateChanges.action_time = moment()
          .add(restrictionTime, "hours")
          .format("YYYY-MM-DD HH:mm:ss");
      }

      await CommunityActivity.update(updateChanges, {
        where: {
          id: postId,
        },
      });

      return response.status(200).json({
        status: true,
        message: "Restriction updated successfully",
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
