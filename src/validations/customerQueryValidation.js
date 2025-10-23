const Joi = require("joi");

const addCustomerQuerySchema = Joi.object({
      userId: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
          "number.base": "User ID must be a valid number",
          "number.positive": "User ID must be greater than 0",
          "any.required": "User ID is required",
        }),

      subject: Joi.string()
        .trim()
        .min(3)
        .max(255)
        .required()
        .messages({
          "string.empty": "Subject is required",
          "string.min": "Subject must be at least 3 characters long",
          "string.max": "Subject cannot exceed 255 characters",
        }),

      query: Joi.string()
        .trim()
        .min(10)
        .required()
        .messages({
          "string.empty": "Query description is required",
          "string.min": "Query must be at least 10 characters long",
        }),
    });


const editQueryValidation = Joi.object({
  userId: Joi.number().integer().required().messages({
    "any.required": "User ID is required",
    "number.base": "User ID must be a valid number",
  }),
  queryId: Joi.number().integer().required().messages({
    "any.required": "Query ID is required",
    "number.base": "Query ID must be a valid number",
  }),
  subject: Joi.string().min(3).max(255).required().messages({
    "any.required": "Subject is required",
    "string.empty": "Subject cannot be empty",
    "string.min": "Subject must be at least 3 characters long",
    "string.max": "Subject cannot exceed 255 characters",
  }),
  query: Joi.string().min(5).required().messages({
    "any.required": "Query text is required",
    "string.empty": "Query cannot be empty",
    "string.min": "Query must be at least 5 characters long",
  }),
});


const updateStatusValidation = Joi.object({
  userId: Joi.number().integer().required().messages({
    "any.required": "User ID is required",
    "number.base": "User ID must be a valid number",
  }),
  queryId: Joi.number().integer().required().messages({
    "any.required": "Query ID is required",
    "number.base": "Query ID must be a valid number",
  }),
  status: Joi.string()
    .required()
    .messages({
      "any.required": "Status is required",
      "any.only": "Status must be one of: pending, in_progress, resolved, or closed",
      "string.empty": "Status cannot be empty",
    }),
});


const updatePriorityValidation = Joi.object({
  userId: Joi.number().integer().required().messages({
    "any.required": "User ID is required",
    "number.base": "User ID must be a valid number",
  }),
  queryId: Joi.number().integer().required().messages({
    "any.required": "Query ID is required",
    "number.base": "Query ID must be a valid number",
  }),
  priority: Joi.string()
    .required()
    .messages({
      "any.required": "Priority is required",
      "any.only": "Priority must be one of: low, medium, high, or urgent",
      "string.empty": "Priority cannot be empty",
    }),
});


const deleteQueryValidation = Joi.object({
  userId: Joi.number().integer().required().messages({
    "any.required": "User ID is required",
    "number.base": "User ID must be a valid number",
  }),
  queryId: Joi.number().integer().required().messages({
    "any.required": "Query ID is required",
    "number.base": "Query ID must be a valid number",
  }),
});


const listQueryValidation = Joi.object({
  pageNo: Joi.number().integer().min(1).required().messages({
    "any.required": "Page number is required",
    "number.base": "Page number must be a number",
    "number.min": "Page number must be at least 1",
  }),
  priority: Joi.string()
    .optional()
    .messages({
      "any.only": "Priority must be one of: low, medium, high",
    }),
  userId: Joi.number().integer().optional().messages({
    "number.base": "User ID must be a number",
  }),
  status: Joi.string()
    .optional()
    .messages({
      "any.only": "Status must be one of: pending, resolved, closed, open",
    }),
  rating: Joi.number().integer().min(1).max(5).optional().messages({
    "number.base": "Rating must be a number",
    "number.min": "Rating must be at least 1",
    "number.max": "Rating cannot be more than 5",
  }),
  attendedBy: Joi.number().integer().optional().messages({
    "number.base": "Attended By must be a valid user ID number",
  }),
});

const addFeedbackValidation = Joi.object({
  userId: Joi.number().integer().required().messages({
    "any.required": "User ID is required",
    "number.base": "User ID must be a number",
  }),
  queryId: Joi.number().integer().required().messages({
    "any.required": "Query ID is required",
    "number.base": "Query ID must be a number",
  }),
  rating: Joi.number().integer().min(1).max(5).required().messages({
    "any.required": "Rating is required",
    "number.base": "Rating must be a number",
    "number.min": "Rating must be at least 1",
    "number.max": "Rating cannot be more than 5",
  }),
  feedback: Joi.string().trim().min(3).max(1000).required().messages({
    "any.required": "Feedback is required",
    "string.base": "Feedback must be a text string",
    "string.empty": "Feedback cannot be empty",
    "string.min": "Feedback must be at least 3 characters long",
    "string.max": "Feedback cannot exceed 1000 characters",
  }),
});

const updateFeedbackValidation = Joi.object({
  userId: Joi.number().integer().required().messages({
    "any.required": "User ID is required",
    "number.base": "User ID must be a number",
  }),
  feedbackId: Joi.number().integer().required().messages({
    "any.required": "Feedback ID is required",
    "number.base": "Feedback ID must be a number",
  }),
  rating: Joi.number().integer().min(1).max(5).required().messages({
    "any.required": "Rating is required",
    "number.base": "Rating must be a number",
    "number.min": "Rating must be at least 1",
    "number.max": "Rating cannot be more than 5",
  }),
  feedback: Joi.string().trim().min(3).max(1000).required().messages({
    "any.required": "Feedback is required",
    "string.base": "Feedback must be a text string",
    "string.empty": "Feedback cannot be empty",
    "string.min": "Feedback must be at least 3 characters long",
    "string.max": "Feedback cannot exceed 1000 characters",
  }),
});

const deleteFeedbackValidation = Joi.object({
  userId: Joi.number().integer().required().messages({
    "any.required": "User ID is required",
    "number.base": "User ID must be a number",
  }),
  feedbackId: Joi.number().integer().required().messages({
    "any.required": "Feedback ID is required",
    "number.base": "Feedback ID must be a number",
  }),
});

const feedbackListValidation = Joi.object({
  pageNo: Joi.number().integer().min(1).required().messages({
    "any.required": "Page number is required",
    "number.base": "Page number must be a number",
    "number.min": "Page number must be at least 1",
  }),
  userId: Joi.number().integer().optional().messages({
    "number.base": "User ID must be a number",
  }),
  attendedBy: Joi.number().integer().optional().messages({
    "number.base": "Attended by must be a number",
  }),
  ratingCount: Joi.number().integer().min(1).max(5).optional().messages({
    "number.base": "Rating count must be a number",
    "number.min": "Rating count must be at least 1",
    "number.max": "Rating count cannot be more than 5",
  }),
});


module.exports = { addCustomerQuerySchema,
    editQueryValidation,
    updateStatusValidation,
    updatePriorityValidation,
    deleteQueryValidation,
    listQueryValidation,
    addFeedbackValidation,
    updateFeedbackValidation,
    deleteFeedbackValidation,
    feedbackListValidation,
};