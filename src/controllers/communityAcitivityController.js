const fs = require("fs");
const path = require("path");
const { Sequelize } = require('sequelize');
const {
  CommunityActivity,
  Tag,
  Comment,
  Category,
  PollQuestion,
  PollOption,
  PollAnswer,
} = require("../database/models");
const LogActivityHandler = require("../Helpers/logActivityHandler");
const appConst = require("../appConst");
let moment = require("moment");
module.exports = {
  add: async (request, response) => {
    try {
      let thumbnailDetail = request.file;
      let thumbnailFileName = thumbnailDetail.filename;
      let categoryId = request.body.categoryId;
      let title = request.body.title;
      let userId = request.body.userId;
      let tags = request.body.tags;
      let description = request.body.description;
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

      await Tag.bulkCreate(tagList);

      await LogActivityHandler(
        request.user.id,
        "Post created", // title
        "Add", //action
        `Post added with tags and details` //information
      );

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
      const activityThumbnailPath = path.join(
        __dirname,
        "..",
        "public",
        "uploads",
        "thumbnail"
      );

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

      if (request.file) {
        if (
          postDetail.image &&
          fs.existsSync(`${activityThumbnailPath}/${postDetail.image}`)
        ) {
          fs.unlinkSync(`${activityThumbnailPath}/${postDetail.image}`);
        }
      }

      let description = request.body.description;

      let dataToUpdate = {
        category_id: request.body.categoryId,
        title: request.body.title,
        description: description,
      };

      if (request.file) {
        let thumbnailDetail = request.file;
        dataToUpdate.image = thumbnailDetail.filename;
      }

      let tags = request.body.tags;

      await CommunityActivity.update(dataToUpdate, { where: { id: postId } });

      let tagList = tags.map((tag) => {
        return {
          tagable_type: "CommunityActivity",
          tagable_id: postId,
          title: tag,
        };
      });

      await Tag.bulkCreate(tagList);

      await LogActivityHandler(
        request.user.id,
        "Post updated", // title
        "Update", //action
        `Post updated with tags and details` //information
      );

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
      console.log(postId);
      const activityThumbnailPath = path.join(
        __dirname,
        "..",
        "public",
        "uploads",
        "thumbnail"
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

      if (postDetail.image) {
        if (fs.existsSync(`${activityThumbnailPath}/${postDetail.image}`)) {
          fs.unlinkSync(`${activityThumbnailPath}/${postDetail.image}`);
        }
      }

      await CommunityActivity.destroy({
        where: {
          id: postId,
        },
      });

      await LogActivityHandler(
        request.user.id,
        "Post deleted", // title
        "Delete", //action
        `delete post` //information
      );

      return response.status(200).json({
        status: true,
        message: "Post deleted successfully",
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

      whereCondition = {};
      if (status) {
        whereCondition.status = status;
      }
      let skip = (parseInt(request.body.pageNo) - 1) * 10;
      // const posts = await CommunityActivity.findAll({
      //   include: [
      //     {
      //       model: Tag,
      //       required: false,
      //       as: "tags",
      //     },
      //     {
      //       model: Comment,
      //       required: false,
      //       as: "comments",
      //     },
      //     {
      //       model: Category,
      //       required: false,
      //       as: "category",
      //     },
      //   ],
      //   where: whereCondition,
      //   offset: skip,
      //   limit: 10,
      // });


      const posts = await CommunityActivity.findAll({
  include: [
    {
      model: Tag,
      as: 'tags',
      where: { tagable_type: 'CommunityActivity' },
      required: false,
    },
    {
      model: Comment,
      as: 'comments',
      where: { commentable_type: 'CommunityActivity' },
      required: false,
    },
    {
      model: Category,
      as: 'category',
    },
    {
      model: PollQuestion,
      as: 'pollQuestions',
      include: [
        {
          model: PollOption,
          as: 'options',
          attributes: [
            'id',
            'poll_question_id',
            'option_text',
            [
              Sequelize.literal(`(
                SELECT COUNT(*) 
                FROM poll_answers 
                WHERE poll_answers.poll_option_id = \`pollQuestions->options\`.id
              )`),
              'answerCount'
            ]
          ],
          required: false
        }
      ]
    }
  ],
  where: whereCondition,
  offset: skip,
  limit: 10
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
      let postId = request.body.postId;
      let status = request.body.status;
      await CommunityActivity.update(
        {
          status: status,
        },
        {
          where: {
            id: postId,
          },
        }
      );

      await LogActivityHandler(
        request.user.id,
        "Status Update", // title
        "Update", //action
        `Post Status Updated` //information
      );

      return response.status(200).json({
        status: true,
        message: "Post Status updated successfully",
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
      let postId = request.body.postId;
      let approvalStatus = request.body.approvalStatus;
      await CommunityActivity.update(
        { is_approved: approvalStatus },
        {
          where: {
            id: postId,
          },
        }
      );

      await LogActivityHandler(
        request.user.id,
        "Approval Update", // title
        "Update", //action
        `Approval Status Updated` //information
      );

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
      let restrictionType = request.body.restrictionType;
      let restrictionTime = request.body.restrictionTime;

      let updateChanges = { status: restrictionType };
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

  createPoll: async (request, response) => {
    try {
      const { activityId, questions } = request.body;
      const userId = request.user.id;

      for (const question of questions) {
        const pollQuestion = await PollQuestion.create({
          community_activity_id: activityId,
          question_text: question.text,
        });

        const pollOptions = question.options.map((option) => ({
          poll_question_id: pollQuestion.id,
          option_text: option,
        }));

        await PollOption.bulkCreate(pollOptions, { returning: true });
      }

      await LogActivityHandler(
        userId,
        "Poll created",
        "Add",
        `Poll created with questions and options`
      );

      return response.status(201).json({
        status: true,
        message: "Poll created successfully",
      });
    } catch (error) {
      return response.status(500).json({
        status: false,
        message: "Something went wrong",
        error: error.message,
      });
    }
  },

  submitPollAnswer: async (request, response) => {
    try {
      const { answerId, questionId  } = request.body;
      const userId = request.user.id;
      const existingPollAnswer = await PollAnswer.findOne({
        include : {
          model : PollOption,
          as: 'pollOption',
          where : {poll_question_id : questionId }
        },
        where: { user_id : userId}
      });

      if (existingPollAnswer) {
        await PollAnswer.update(
          { poll_option_id: answerId },
          { where: { id: existingPollAnswer.id } }
        );
      } else {
        await PollAnswer.create({
          user_id: userId, 
          poll_option_id: answerId
        });
      }


      const pollDetail = await PollQuestion.findOne({
                                              where: { id: questionId },
                                              include: {
                                                model: PollOption,
                                                as: 'options',
                                                include: [
                                                  {
                                                    model: PollAnswer,
                                                    as: 'answers',
                                                    attributes: []
                                                  }
                                                ],
                                                attributes: {
                                                  include: [
                                                    [
                                                      Sequelize.fn("COUNT", Sequelize.col("options.answers.id")),
                                                      "answerCount"
                                                    ]
                                                  ]
                                                },
                                                required: false,
                                                subQuery: false
                                              },
                                              group: ['PollQuestion.id', 'options.id']
                                            });


      await LogActivityHandler(
        userId,
        "Poll Answer Submitted",
        "Add",
        `User submitted poll answers`
      );

      return response.status(200).json({
        status: true,
        data : pollDetail,
        message: "Poll answer submitted successfully",
      });
    } catch (error) {
      return response.status(500).json({
        status: false,
        message: "Something went wrong",
        error: error.message,
      });
    }
  },

  getPollResults: async (request, response) => {
    try {
     const { questionId } = request.params;

      const results = await PollQuestion.findOne({
                                              where: { id: questionId },
                                              include: {
                                                model: PollOption,
                                                as: 'options',
                                                include: [
                                                  {
                                                    model: PollAnswer,
                                                    as: 'answers',
                                                    attributes: []
                                                  }
                                                ],
                                                attributes: {
                                                  include: [
                                                    [
                                                      Sequelize.fn("COUNT", Sequelize.col("options.answers.id")),
                                                      "answerCount"
                                                    ]
                                                  ]
                                                },
                                                required: false,
                                                subQuery: false
                                              },
                                              group: ['PollQuestion.id', 'options.id']
                                            });


      return response.status(200).json({
        status: true,
        data: results,
      });
    } catch (error) {
      return response.status(500).json({
        status: false,
        message: "Something went wrong",
        error: error.message,
      });
    }
  },

  getCommunityActivityWithPoll: async (req, res) => {
    try {
      const { postId } = req.params;

      const results = await CommunityActivity.findOne({
                                            where: { id: postId },
                                            include: [
                                              {
                                                model: PollQuestion,
                                                as: 'pollQuestions',
                                                include: [
                                                  {
                                                    model: PollOption,
                                                    as: 'options',
                                                    include: [
                                                      {
                                                        model: PollAnswer,
                                                        as: 'answers',
                                                        attributes: []
                                                      }
                                                    ],
                                                    attributes: {
                                                      include: [
                                                        [
                                                          Sequelize.fn("COUNT", Sequelize.col("pollQuestions.options.answers.id")),
                                                          "answerCount"
                                                        ]
                                                      ]
                                                    },
                                                    required: false
                                                  }
                                                ]
                                              }
                                            ],
                                            group: ['CommunityActivity.id', 'pollQuestions.id', 'pollQuestions.options.id'],
                                          });

      res.status(200).json({ status: true , data : results });
    } catch (error) {
      console.error("Error fetching community activity:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },

  updateTemplate: async (request, response) => {},
};
