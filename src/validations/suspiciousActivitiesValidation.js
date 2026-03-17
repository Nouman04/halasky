const Joi = require('joi');

const validateGetIpsSchema = Joi.object({
    pageNo: Joi.number().integer().min(1).required()
      .messages({
        'any.required': '"pageNo" is required',
        'number.base': '"pageNo" must be a number',
        'number.min': '"pageNo" must be at least 1'
      }),
    status: Joi.string().optional()
      .messages({
        'any.only': '"status" must be one of [active, inactive, blocked]'
      }),
    ip: Joi.string().ip({ version: ['ipv4', 'ipv6'], cidr: 'forbidden' }).optional()
      .messages({
        'string.ip': '"ip" must be a valid IP address'
      })
  });



const validateUpdateIpSchema =  Joi.object({
    id: Joi.number().integer().required()
      .messages({
        'any.required': '"id" is required',
        'number.base': '"id" must be a valid number'
      }),
    status: Joi.string().required()
      .messages({
        'any.required': '"status" is required',
        'any.only': '"status" must be one of [active, inactive, blocked]'
      })
  });



const validateSuspiciousLogActivitiesSchema = Joi.object({
    pageNo: Joi.number().integer().min(1).required()
      .messages({
        'any.required': '"pageNo" is required',
        'number.base': '"pageNo" must be a number',
        'number.min': '"pageNo" must be at least 1'
      })
  });


  module.exports = {validateGetIpsSchema , validateUpdateIpSchema , validateSuspiciousLogActivitiesSchema};
