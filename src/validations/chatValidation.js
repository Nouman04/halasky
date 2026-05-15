const Joi = require("joi");

const askQuestionValidation = Joi.object({
    question: Joi.string()
        .trim()
        .min(5)
        .max(200)
        .required()
        .messages({
        "string.base": `"question" must be a text`,
        "string.empty": `"question" cannot be empty`,
        "string.min": `"question" should have at least {#limit} characters`,
        "string.max": `"question" should have at most {#limit} characters`,
        "any.required": `"question" is required`
        }),
});

const aiMessageSchema = Joi.object({
    offset: Joi.number()
      .integer()
      .min(0)
      .required()
      .messages({
        "number.base": `"offset" must be a number`,
        "number.min": `"offset" cannot be negative`,
        "any.required": `"offset" is required`,
      }),
  });


const sendMessageSchema = Joi.object({
    message: Joi.string()
      .trim()
      .min(1)
      .max(5000)
      .required()
      .messages({
        "string.base": `"message" must be a string`,
        "string.empty": `"message" cannot be empty`,
        "string.min": `"message" must contain at least 1 character`,
        "string.max": `"message" cannot exceed 5000 characters`,
        "any.required": `"message" is required`,
      }),

    send_to: Joi.number()
      .integer()
      .positive()
      .required()
      .messages({
        "number.base": `"send_to" must be a number`,
        "number.integer": `"send_to" must be an integer`,
        "number.positive": `"send_to" must be a positive number`,
        "any.required": `"send_to" is required`,
      }),
  });


  const chatMessageSchema = Joi.object({
  offset: Joi.number()
    .integer()
    .min(0)
    .required()
    .messages({
      "number.base": `"offset" must be a number`,
      "number.integer": `"offset" must be an integer`,
      "number.min": `"offset" cannot be negative`,
      "any.required": `"offset" is required`,
    }),

  person_id: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      "number.base": `"person_id" must be a number`,
      "number.integer": `"person_id" must be an integer`,
      "number.positive": `"person_id" must be a positive number`,
      "any.required": `"person_id" is required`,
    }),
});


module.exports = { askQuestionValidation , aiMessageSchema , sendMessageSchema , chatMessageSchema };