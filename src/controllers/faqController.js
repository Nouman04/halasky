const { FrequentlyAskQuestion } = require("../database/models");
const { Comment } = require("../database/models");
const { User } = require("../database/models");
const { isEmpty, isInt, isBoolean, isLength, isArray } = require("validator");

module.exports = {
  add: async (request, response) => {
    try {
      let { userId, question, answer } = request.body;

      if (!question || isEmpty(question.trim())) {
        return response.status(400).json({
          status: false,
          message: "Question is required",
        });
      }

      if (!answer || isEmpty(answer.trim())) {
        return response.status(400).json({
          status: false,
          message: "Answer is required",
        });
      }

      await FrequentlyAskQuestion.create({
        user_id: userId,
        question: question,
        answer: answer,
      });

      return response.status(200).json({
        status: true,
        message: "Question added successfully",
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
      let { userId, question, answer, id } = request.body;

      if (userId && !validator.isInt(userId.toString())) {
        return response.status(400).json({
          status: false,
          message: "Valid userId is required.",
        });
      }

      if (!question || isEmpty(question.trim())) {
        return response.status(400).json({
          status: false,
          message: "Question is required",
        });
      }

      if (!answer || isEmpty(answer.trim())) {
        return response.status(400).json({
          status: false,
          message: "Answer is required",
        });
      }

      if (!id || !isInt(id.toString())) {
        return response.status(400).json({
          status: false,
          message: "Valid id is required.",
        });
      }

      await FrequentlyAskQuestion.update(
        {
          user_id: userId,
          question: question,
          answer: answer,
        },
        {
          where: { id: id },
        }
      );

      return response.status(200).json({
        status: true,
        message: "Question added successfully",
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
      let questions = await FrequentlyAskQuestion.findAll({
        include: [
          {
            model: User,
            as: "createdByUser",
          },
        ],
      });

      return response.status(200).json({
        status: true,
        data: questions,
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
      const questionId = request.body.questionId;

      if (!questionId || !isInt(questionId.toString())) {
        return response.status(400).json({
          status: false,
          message: "Valid questionId is required.",
        });
      }

      await FrequentlyAskQuestion.destroy({
        where: {
          id: questionId,
        },
      });

      return response.status(200).json({
        status: true,
        message: "Question deleted successfully",
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
