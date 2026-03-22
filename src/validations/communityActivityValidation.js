const Joi = require("joi");

const addCommunityActivitySchema = Joi.object({
  categoryId: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      "number.base": `"categoryId" must be a number`,
      "number.integer": `"categoryId" must be an integer`,
      "number.positive": `"categoryId" must be a positive number`,
      "any.required": `"categoryId" is required`,
    }),

  title: Joi.string()
    .trim()
    .min(3)
    .max(255)
    .required()
    .messages({
      "string.base": `"title" must be a string`,
      "string.empty": `"title" cannot be empty`,
      "string.min": `"title" must contain at least 3 characters`,
      "string.max": `"title" cannot exceed 255 characters`,
      "any.required": `"title" is required`,
    }),

  description: Joi.string()
    .trim()
    .min(5)
    .max(5000)
    .required()
    .messages({
      "string.base": `"description" must be a string`,
      "string.empty": `"description" cannot be empty`,
      "string.min": `"description" must contain at least 5 characters`,
      "string.max": `"description" cannot exceed 5000 characters`,
      "any.required": `"description" is required`,
    }),

  tags: Joi.array()
    .items(
      Joi.string()
        .trim()
        .min(1)
        .max(50)
        .messages({
          "string.base": `"tags" must be an array of strings`,
          "string.empty": `"tags" cannot contain empty values`,
          "string.max": `"tags" cannot exceed 50 characters`,
        })
    )
    .min(1)
    .required()
    .messages({
      "array.base": `"tags" must be an array`,
      "array.min": `"tags" must contain at least one tag`,
      "any.required": `"tags" is required`,
    }),
});

const editValidationSchema = Joi.object({
  id: Joi.number().integer().required().messages({
    "any.required": "Post ID is required",
    "number.base": "Post ID must be a number",
  }),

  categoryId: Joi.number().integer().required().messages({
    "any.required": "Category ID is required",
    "number.base": "Category ID must be a number",
  }),

  title: Joi.string().trim().min(3).max(255).required().messages({
    "any.required": "Title is required",
    "string.empty": "Title cannot be empty",
    "string.min": "Title must be at least 3 characters long",
    "string.max": "Title cannot exceed 255 characters",
  }),

  description: Joi.string().trim().allow("").messages({
    "string.base": "Description must be a string",
  }),

  tags: Joi.array()
    .items(Joi.string().trim().min(1).max(50))
    .required()
    .messages({
      "array.base": "Tags must be an array",
      "array.includes": "Each tag must be a valid string",
      "any.required": "Tags are required",
    }),
});


const deleteCommunityValidationSchema = Joi.object({
  id: Joi.number().integer().required().messages({
    "any.required": "Post ID is required",
    "number.base": "Post ID must be a number",
    "number.integer": "Post ID must be an integer",
  }),
});


const listCommunityActivityValidationSchema = Joi.object({
  status: Joi.string()
    .optional()
    .messages({
      "string.base": "Status must be a string",
      "any.only": "Status must be one of active, inactive, pending, or deleted",
    }),

  pageNo: Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      "any.required": "Page number is required",
      "number.base": "Page number must be a number",
      "number.integer": "Page number must be an integer",
      "number.min": "Page number must be at least 1",
    }),

  pageSize: Joi.number()
    .integer()
    .min(1)
    .optional()
    .messages({
      "number.base": "Page size must be a number",
      "number.integer": "Page size must be an integer",
      "number.min": "Page size must be at least 1",
    }),
});

const changeStatusValidationSchema = Joi.object({
  postId: Joi.number()
    .integer()
    .required()
    .messages({
      "any.required": "Post ID is required",
      "number.base": "Post ID must be a number",
      "number.integer": "Post ID must be an integer",
    }),

  status: Joi.string()
    .required()
    .messages({
      "any.required": "Status is required",
      "string.base": "Status must be a string",
      "any.only": "Invalid status value",
    }),
});


const changeApprovalValidationSchema = Joi.object({
  postId: Joi.number()
    .integer()
    .required()
    .messages({
      "any.required": "Post ID is required",
      "number.base": "Post ID must be a number",
      "number.integer": "Post ID must be an integer",
    }),

  approvalStatus: Joi.boolean()
    .required()
    .messages({
      "any.required": "Approval status is required",
      "boolean.base": "Approval status must be true or false",
    }),
});

const updateRestrictionValidationSchema = Joi.object({
  postId: Joi.number()
    .integer()
    .required()
    .messages({
      "any.required": "Post ID is required",
      "number.base": "Post ID must be a number",
      "number.integer": "Post ID must be an integer",
    }),

  restrictionType: Joi.string()
    .required()
    .messages({
      "any.required": "Restriction type is required",
      "string.base": "Restriction type must be a string",
      "any.only": "Restriction type must be one of: active, restricted, suspended, or banned",
    }),

  restrictionTime: Joi.number()
    .integer()
    .positive()
    .optional()
    .messages({
      "number.base": "Restriction time must be a number",
      "number.integer": "Restriction time must be an integer",
      "number.positive": "Restriction time must be a positive number",
    }),
});


const createPollValidationSchema = Joi.object({
  activityId: Joi.number()
    .integer()
    .required()
    .messages({
      "any.required": "Activity ID is required",
      "number.base": "Activity ID must be a number",
      "number.integer": "Activity ID must be an integer",
    }),

  questions: Joi.array()
    .items(
      Joi.object({
        text: Joi.string()
          .trim()
          .min(3)
          .max(255)
          .required()
          .messages({
            "any.required": "Question text is required",
            "string.base": "Question text must be a string",
            "string.empty": "Question text cannot be empty",
            "string.min": "Question text must be at least 3 characters",
            "string.max": "Question text cannot exceed 255 characters",
          }),

        options: Joi.array()
          .items(
            Joi.string()
              .trim()
              .min(1)
              .max(100)
              .required()
              .messages({
                "any.required": "Each option text is required",
                "string.base": "Option text must be a string",
                "string.empty": "Option text cannot be empty",
                "string.max": "Option text cannot exceed 100 characters",
              })
          )
          .min(2)
          .max(10)
          .required()
          .messages({
            "array.base": "Options must be an array",
            "array.min": "Each question must have at least 2 options",
            "array.max": "Each question can have up to 10 options",
            "any.required": "Options are required for each question",
          }),
      })
    )
    .min(1)
    .required()
    .messages({
      "array.base": "Questions must be an array",
      "array.min": "At least one question is required",
      "any.required": "Questions field is required",
    }),
});

const submitPollAnswerValidationSchema = Joi.object({
  answerId: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      "any.required": "Answer ID is required",
      "number.base": "Answer ID must be a valid number",
      "number.integer": "Answer ID must be an integer",
      "number.positive": "Answer ID must be a positive number",
    }),

  questionId: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      "any.required": "Question ID is required",
      "number.base": "Question ID must be a valid number",
      "number.integer": "Question ID must be an integer",
      "number.positive": "Question ID must be a positive number",
    }),
});


const toggleActivityActionSchema = Joi.object({
  activityId: Joi.number().integer().positive().required().messages({
    "any.required": "Activity ID is required",
    "number.base": "Activity ID must be a valid number",
  }),

  activityType: Joi.string()
    .valid(
      "is_spam",
      "is_saved",
      "liked",
      "heart",
      "surprice",
      "angry",
      "happy",
      "sad",
      "shock"
    )
    .required()
    .messages({
      "any.required": "Activity type is required",
      "any.only":
        "Activity type must be one of: is_spam, is_saved, liked, heart, surprice, angry, happy, sad, shock",
    }),

  value: Joi.number()
    .valid(0, 1)
    .required()
    .messages({
      "any.required": "Value is required",
      "any.only": "Value must be either 0 (remove) or 1 (add)",
    }),
});


const getUserActivitiesSchema = Joi.object({
  pageNo: Joi.number()
    .integer()
    .positive()
    .optional()
    .messages({
      "number.base": "Page number must be a valid number",
      "number.positive": "Page number must be greater than 0",
    }),
});


const adminActivitiesSchema = Joi.object({
  pageNo: Joi.number()
    .integer()
    .positive()
    .optional()
    .messages({
      "number.base": "Page number must be a valid number",
      "number.positive": "Page number must be greater than 0",
    }),
});

module.exports = {
  addCommunityActivitySchema,
  editValidationSchema,
  deleteCommunityValidationSchema,
  listCommunityActivityValidationSchema,
  changeStatusValidationSchema,
  changeApprovalValidationSchema,
  updateRestrictionValidationSchema,
  createPollValidationSchema,
  submitPollAnswerValidationSchema,
  toggleActivityActionSchema,
  getUserActivitiesSchema,
  adminActivitiesSchema
};