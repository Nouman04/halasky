const Joi = require("joi");

   const addFAQSchema = Joi.object({
        userId: Joi.number().required().messages({
            'any.required': 'User ID is required',
            'number.base': 'User ID must be a number'
        }),
        question: Joi.string().trim().min(5).required().messages({
            'any.required': 'Question is required',
            'string.empty': 'Question cannot be empty',
            'string.min': 'Question must be at least 5 characters'
        }),
        answer: Joi.string().trim().min(5).required().messages({
            'any.required': 'Answer is required',
            'string.empty': 'Answer cannot be empty',
            'string.min': 'Answer must be at least 5 characters'
        }),
    })

const editFAQSchema = Joi.object({
        userId: Joi.number().required().messages({
            'any.required': 'User ID is required',
        }),
        id: Joi.number().required().messages({
            'any.required': 'Question ID is required',
        }),
        question: Joi.string().trim().min(5).required().messages({
            'any.required': 'Question is required',
            'string.min': 'Question must be at least 5 characters'
        }),
        answer: Joi.string().trim().min(5).required().messages({
            'any.required': 'Answer is required',
            'string.min': 'Answer must be at least 5 characters'
        }),
    })

const deleteFAQSchema =  Joi.object({
        questionId: Joi.number().required().messages({
            'any.required': 'Question ID is required',
        }),
        userId: Joi.number().required().messages({
            'any.required': 'User ID is required',
        }),
    }) 



module.exports = {  addFAQSchema , editFAQSchema, deleteFAQSchema };