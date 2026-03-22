const Joi = require("joi");

// Validation schema
const blogAddSchema = Joi.object({
  categoryId: Joi.number().integer().required().messages({
    "any.required": "Category ID is required",
  }),

  title: Joi.string().min(3).max(255).required(),

  isPublished: Joi.boolean()
    .truthy("1")
    .falsy("0")
    .required()
    .messages({
      "any.required": "Publish status is required",
    }),

  content: Joi.string().required(),

  tags: Joi.alternatives()
    .try(
      Joi.array().items(Joi.string()),
      Joi.string() // In form-data, repeated fields come as strings
    )
    .required()
    .messages({
      "any.required": "At least one tag is required",
    }),
});

const blogEditSchema = Joi.object({
  id: Joi.number().integer().positive().required().messages({
    "any.required": "Blog ID is required",
    "number.base": "Blog ID must be a valid number",
  }),

  categoryId: Joi.number().integer().positive().required().messages({
    "any.required": "Category ID is required",
  }),

  title: Joi.string().min(3).max(255).required().messages({
    "string.empty": "Title cannot be empty",
    "any.required": "Title is required",
  }),

  isPublished: Joi.boolean()
    .truthy("1")
    .falsy("0")
    .required()
    .messages({
      "any.required": "Publish status is required",
    }),

  content: Joi.string().required().messages({
    "any.required": "Content is required",
  }),

  tags: Joi.alternatives()
    .try(
      Joi.array().items(Joi.string().trim().min(1)),
      Joi.string().trim().min(1)
    )
    .required()
    .messages({
      "any.required": "At least one tag is required",
    }),

  thumbnail: Joi.any().optional(),
});


const blogDeleteSchema = Joi.object({
  id: Joi.number().integer().positive().required().messages({
    "any.required": "Blog ID is required.",
    "number.base": "Blog ID must be a valid number.",
    "number.integer": "Blog ID must be an integer.",
    "number.positive": "Blog ID must be greater than 0.",
  })
});


const blogListSchema = Joi.object({
  status: Joi.number()
    .integer()
    .required()
    .messages({
      "any.required": "Status is required.",
      "number.base": "Status must be a valid number.",
      "any.only": "Status must be either 0 (unpublished) or 1 (published).",
    }),

  pageNo: Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      "any.required": "Page number is required.",
      "number.base": "Page number must be a valid number.",
      "number.min": "Page number must be at least 1.",
    }),
});



module.exports = { blogAddSchema , blogEditSchema , blogDeleteSchema , blogListSchema };