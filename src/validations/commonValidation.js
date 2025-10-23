const Joi = require("joi");

const addCommentSchema = Joi.object({
  id: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      "number.base": `"id" must be a number`,
      "number.integer": `"id" must be an integer`,
      "number.positive": `"id" must be a positive number`,
      "any.required": `"id" is required`,
    }),

  type: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .required()
    .messages({
      "string.base": `"type" must be a string`,
      "string.empty": `"type" cannot be empty`,
      "string.min": `"type" must contain at least 2 characters`,
      "string.max": `"type" cannot exceed 50 characters`,
      "any.required": `"type" is required`,
    }),

  comment: Joi.string()
    .trim()
    .min(1)
    .max(1000)
    .required()
    .messages({
      "string.base": `"comment" must be a string`,
      "string.empty": `"comment" cannot be empty`,
      "string.min": `"comment" must contain at least 1 character`,
      "string.max": `"comment" cannot exceed 1000 characters`,
      "any.required": `"comment" is required`,
    }),
});

const updateCommentSchema = Joi.object({
  id: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      "number.base": `"id" must be a number`,
      "number.integer": `"id" must be an integer`,
      "number.positive": `"id" must be a positive number`,
      "any.required": `"id" is required`,
    }),

  comment: Joi.string()
    .trim()
    .min(1)
    .max(1000)
    .required()
    .messages({
      "string.base": `"comment" must be a string`,
      "string.empty": `"comment" cannot be empty`,
      "string.min": `"comment" must contain at least 1 character`,
      "string.max": `"comment" cannot exceed 1000 characters`,
      "any.required": `"comment" is required`,
    }),
});


const deleteCommentSchema = Joi.object({
  commentId: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      "number.base": `"commentId" must be a number`,
      "number.integer": `"commentId" must be an integer`,
      "number.positive": `"commentId" must be a positive number`,
      "any.required": `"commentId" is required`,
    }),
});

const addViolationSchema = Joi.object({
  personId: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      "number.base": `"personId" must be a number`,
      "number.integer": `"personId" must be an integer`,
      "number.positive": `"personId" must be a positive number`,
      "any.required": `"personId" is required`,
    }),

  id: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      "number.base": `"id" must be a number`,
      "number.integer": `"id" must be an integer`,
      "number.positive": `"id" must be a positive number`,
      "any.required": `"id" is required`,
    }),

  type: Joi.string()
    .trim()
    .required()
    .messages({
      "string.base": `"type" must be a string`,
      "string.empty": `"type" cannot be empty`,
      "any.only": `"type" must be one of [User, Post, Comment, Activity, Other]`,
      "any.required": `"type" is required`,
    }),

  reason: Joi.string()
    .trim()
    .min(5)
    .max(500)
    .required()
    .messages({
      "string.base": `"reason" must be a string`,
      "string.empty": `"reason" cannot be empty`,
      "string.min": `"reason" must contain at least 5 characters`,
      "string.max": `"reason" cannot exceed 500 characters`,
      "any.required": `"reason" is required`,
    }),
});

const updateViolationSchema = Joi.object({
  violationId: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      "number.base": `"violationId" must be a number`,
      "number.integer": `"violationId" must be an integer`,
      "number.positive": `"violationId" must be a positive number`,
      "any.required": `"violationId" is required`,
    }),

  reason: Joi.string()
    .trim()
    .min(5)
    .max(500)
    .required()
    .messages({
      "string.base": `"reason" must be a string`,
      "string.empty": `"reason" cannot be empty`,
      "string.min": `"reason" must contain at least 5 characters`,
      "string.max": `"reason" cannot exceed 500 characters`,
      "any.required": `"reason" is required`,
    }),
});

const listViolationSchema = Joi.object({
  pageNo: Joi.number()
    .integer()
    .min(1)
    .default(1)
    .messages({
      "number.base": `"pageNo" must be a number`,
      "number.integer": `"pageNo" must be an integer`,
      "number.min": `"pageNo" must be at least 1`,
    }),

  personId: Joi.number()
    .integer()
    .positive()
    .optional()
    .messages({
      "number.base": `"personId" must be a number`,
      "number.integer": `"personId" must be an integer`,
      "number.positive": `"personId" must be a positive number`,
    }),

  addedBy: Joi.number()
    .integer()
    .positive()
    .optional()
    .messages({
      "number.base": `"addedBy" must be a number`,
      "number.integer": `"addedBy" must be an integer`,
      "number.positive": `"addedBy" must be a positive number`,
    }),

  type: Joi.string()
    .trim()
    .optional()
    .messages({
      "string.base": `"type" must be a string`,
      "any.only": `"type" must be one of [Warning, Penalty, Suspension, Other]`,
    }),
});

const deleteViolationSchema = Joi.object({
  violationId: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      "number.base": `"violationId" must be a number`,
      "number.integer": `"violationId" must be an integer`,
      "number.positive": `"violationId" must be a positive number`,
      "any.required": `"violationId" is required`,
    }),
});

const listCategoriesSchema = Joi.object({
  status: Joi.string()
    .optional()
    .messages({
      "string.base": `"status" must be a string`,
      "any.only": `"status" must be either 'active' or 'inactive'`,
    }),
});

const addPromotionCodeSchema = Joi.object({
  promotion_name: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .required()
    .messages({
      "string.base": `"promotion_name" must be a string`,
      "string.empty": `"promotion_name" cannot be empty`,
      "string.min": `"promotion_name" must be at least 3 characters`,
      "string.max": `"promotion_name" cannot exceed 100 characters`,
      "any.required": `"promotion_name" is required`,
    }),

  applicable_service: Joi.string()
    .required()
    .messages({
      "any.only": `"applicable_service" must be 'flight', 'hotel', or 'both'`,
      "any.required": `"applicable_service" is required`,
    }),

  promotion_type: Joi.string()
    .required()
    .messages({
      "any.only": `"promotion_type" must be 'Fixed' or 'Percentage'`,
      "any.required": `"promotion_type" is required`,
    }),

  code: Joi.string()
    .alphanum()
    .min(3)
    .max(20)
    .required()
    .messages({
      "string.base": `"code" must be a string`,
      "string.empty": `"code" cannot be empty`,
      "string.alphanum": `"code" must contain only letters and numbers`,
      "string.min": `"code" must be at least 3 characters`,
      "string.max": `"code" cannot exceed 20 characters`,
      "any.required": `"code" is required`,
    }),

  percentage: Joi.number()
    .min(1)
    .max(100)
    .when("promotion_type", {
      is: "Percentage",
      then: Joi.required(),
      otherwise: Joi.forbidden(),
    })
    .messages({
      "number.base": `"percentage" must be a number`,
      "number.min": `"percentage" must be at least 1`,
      "number.max": `"percentage" cannot exceed 100`,
      "any.required": `"percentage" is required when promotion_type is 'Percentage'`,
    }),

  fixed_amount: Joi.number()
    .min(1)
    .when("promotion_type", {
      is: "Fixed",
      then: Joi.required(),
      otherwise: Joi.forbidden(),
    })
    .messages({
      "number.base": `"fixed_amount" must be a number`,
      "number.min": `"fixed_amount" must be at least 1`,
      "any.required": `"fixed_amount" is required when promotion_type is 'Fixed'`,
    }),

  applicable_from: Joi.date()
    .required()
    .messages({
      "date.base": `"applicable_from" must be a valid date`,
      "any.required": `"applicable_from" is required`,
    }),

  applicable_to: Joi.date()
    .greater(Joi.ref("applicable_from"))
    .required()
    .messages({
      "date.base": `"applicable_to" must be a valid date`,
      "date.greater": `"applicable_to" must be after "applicable_from"`,
      "any.required": `"applicable_to" is required`,
    }),

  condition: Joi.string()
    .required()
    .messages({
      "any.only": `"condition" must be 'minimum' or 'none'`,
      "any.required": `"condition" is required`,
    }),

  amount: Joi.number()
    .min(1)
    .when("condition", {
      is: "minimum",
      then: Joi.required(),
      otherwise: Joi.forbidden(),
    })
    .messages({
      "number.base": `"amount" must be a number`,
      "number.min": `"amount" must be greater than 0`,
      "any.required": `"amount" is required when condition is 'minimum'`,
    }),

  total_promo: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      "number.base": `"total_promo" must be a number`,
      "number.integer": `"total_promo" must be an integer`,
      "number.positive": `"total_promo" must be positive`,
      "any.required": `"total_promo" is required`,
    }),
});

const updatePromotionCodeSchema = Joi.object({
  id: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      "number.base": `"id" must be a number`,
      "number.integer": `"id" must be an integer`,
      "number.positive": `"id" must be a positive number`,
      "any.required": `"id" is required`,
    }),

  promotion_name: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .required()
    .messages({
      "string.base": `"promotion_name" must be a string`,
      "string.empty": `"promotion_name" cannot be empty`,
      "string.min": `"promotion_name" must be at least 3 characters`,
      "string.max": `"promotion_name" cannot exceed 100 characters`,
      "any.required": `"promotion_name" is required`,
    }),

  applicable_service: Joi.string()
    .required()
    .messages({
      "any.only": `"applicable_service" must be 'flight', 'hotel', or 'both'`,
      "any.required": `"applicable_service" is required`,
    }),

  promotion_type: Joi.string()
    .required()
    .messages({
      "any.only": `"promotion_type" must be 'Fixed' or 'Percentage'`,
      "any.required": `"promotion_type" is required`,
    }),

  code: Joi.string()
    .alphanum()
    .min(3)
    .max(20)
    .required()
    .messages({
      "string.base": `"code" must be a string`,
      "string.empty": `"code" cannot be empty`,
      "string.alphanum": `"code" must contain only letters and numbers`,
      "string.min": `"code" must be at least 3 characters`,
      "string.max": `"code" cannot exceed 20 characters`,
      "any.required": `"code" is required`,
    }),

  percentage: Joi.number()
    .min(1)
    .max(100)
    .when("promotion_type", {
      is: "Percentage",
      then: Joi.required(),
      otherwise: Joi.forbidden(),
    })
    .messages({
      "number.base": `"percentage" must be a number`,
      "number.min": `"percentage" must be at least 1`,
      "number.max": `"percentage" cannot exceed 100`,
      "any.required": `"percentage" is required when promotion_type is 'Percentage'`,
    }),

  fixed_amount: Joi.number()
    .min(1)
    .when("promotion_type", {
      is: "Fixed",
      then: Joi.required(),
      otherwise: Joi.forbidden(),
    })
    .messages({
      "number.base": `"fixed_amount" must be a number`,
      "number.min": `"fixed_amount" must be at least 1`,
      "any.required": `"fixed_amount" is required when promotion_type is 'Fixed'`,
    }),

  applicable_from: Joi.date()
    .required()
    .messages({
      "date.base": `"applicable_from" must be a valid date`,
      "any.required": `"applicable_from" is required`,
    }),

  applicable_to: Joi.date()
    .greater(Joi.ref("applicable_from"))
    .required()
    .messages({
      "date.base": `"applicable_to" must be a valid date`,
      "date.greater": `"applicable_to" must be after "applicable_from"`,
      "any.required": `"applicable_to" is required`,
    }),

  condition: Joi.string()
    .required()
    .messages({
      "any.only": `"condition" must be 'minimum' or 'none'`,
      "any.required": `"condition" is required`,
    }),

  amount: Joi.number()
    .min(1)
    .when("condition", {
      is: "minimum",
      then: Joi.required(),
      otherwise: Joi.forbidden(),
    })
    .messages({
      "number.base": `"amount" must be a number`,
      "number.min": `"amount" must be greater than 0`,
      "any.required": `"amount" is required when condition is 'minimum'`,
    }),

  total_promo: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      "number.base": `"total_promo" must be a number`,
      "number.integer": `"total_promo" must be an integer`,
      "number.positive": `"total_promo" must be positive`,
      "any.required": `"total_promo" is required`,
    }),
});

const getPromotionCodeSchema = Joi.object({
                code: Joi.string()
                    .trim()
                    .required()
                    .messages({
                        'string.base': 'Promotion code must be a string',
                        'string.empty': 'Promotion code cannot be empty',
                        'any.required': 'Promotion code is required',
                    }),
            });

const deletePromotionCodeSchema = Joi.object({
                id: Joi.number()
                    .integer()
                    .positive()
                    .required()
                    .messages({
                        'number.base': `"id" must be a number`,
                        'number.integer': `"id" must be an integer`,
                        'number.positive': `"id" must be a positive number`,
                        'any.required': `"id" is required`,
                    }),
            });


module.exports = {  addCommentSchema, 
                    updateCommentSchema, 
                    deleteCommentSchema, 
                    addViolationSchema, 
                    updateViolationSchema, 
                    listViolationSchema, 
                    deleteViolationSchema,
                    listCategoriesSchema,
                    addPromotionCodeSchema,
                    updatePromotionCodeSchema,
                    getPromotionCodeSchema,
                    deletePromotionCodeSchema
                };