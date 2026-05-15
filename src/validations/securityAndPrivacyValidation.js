const Joi = require('joi');

const getMiliciousActivitiesSchema = Joi.object({
    pageNo: Joi.number().integer().min(1).required().messages({
        'any.required': 'Page number is required',
        'number.base': 'Page number must be a number',
        'number.min': 'Page number must be at least 1'
    }),
    userId: Joi.number().optional().messages({
        'number.base': 'User ID must be a number'
    }),
    status: Joi.string().optional().messages({
        'string.base': 'Status must be a string',
        'any.only': 'Status must be one of pending, resolved, or blocked'
    }),
    ipAddress: Joi.string().ip({ version: ['ipv4', 'ipv6'], cidr: 'forbidden' }).optional().messages({
        'string.ip': 'IP address must be a valid IPv4 or IPv6 address'
    }),
});

const updateActivityStatusSchema = Joi.object({
    id: Joi.number().required().messages({
        'any.required': 'Activity ID is required',
        'number.base': 'Activity ID must be a number'
    }),
    status: Joi.string().required().messages({
        'any.required': 'Status is required',
        'any.only': 'Status must be one of pending, resolved, or blocked'
    }),
    userId: Joi.number().required().messages({
        'any.required': 'User ID is required',
        'number.base': 'User ID must be a number'
    }),
});

const getAdminActivitiesSchema = Joi.object({
    pageNo: Joi.number().integer().min(1).required().messages({
        'any.required': 'Page number is required',
        'number.base': 'Page number must be a number',
        'number.min': 'Page number must be at least 1'
    }),
});

const getUserActivitiesSchema = Joi.object({
    pageNo: Joi.number().integer().min(1).required().messages({
        'any.required': 'Page number is required',
        'number.base': 'Page number must be a number',
        'number.min': 'Page number must be at least 1'
    }),
});

module.exports = { getMiliciousActivitiesSchema , updateActivityStatusSchema , getAdminActivitiesSchema , getUserActivitiesSchema };
