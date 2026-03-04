const Joi = require('joi');


const updateSettingSchema = Joi.object({
    primaryColor: Joi.string().pattern(/^#([0-9A-F]{3}){1,2}$/i).required().messages({
      'any.required': 'Primary color is required',
      'string.pattern.base': 'Primary color must be a valid HEX code'
    }),
    secondaryColor: Joi.string().pattern(/^#([0-9A-F]{3}){1,2}$/i).required().messages({
      'any.required': 'Secondary color is required',
      'string.pattern.base': 'Secondary color must be a valid HEX code'
    }),
    thirdColor: Joi.string().pattern(/^#([0-9A-F]{3}){1,2}$/i).optional(),
    fourthColor: Joi.string().pattern(/^#([0-9A-F]{3}){1,2}$/i).optional(),
    fifthColor: Joi.string().pattern(/^#([0-9A-F]{3}){1,2}$/i).optional(),
    primaryFont: Joi.string().max(100).required().messages({
      'any.required': 'Primary font is required',
      'string.max': 'Primary font must be less than 100 characters'
    }),
    secondaryFont: Joi.string().max(100).required().messages({
      'any.required': 'Secondary font is required',
      'string.max': 'Secondary font must be less than 100 characters'
    }),
  });

  
const updateAboutInformationSchema =  Joi.object({
    upperContent: Joi.string().required().messages({
      'any.required': 'Upper content is required',
    }),
    lowerContent: Joi.string().required().messages({
      'any.required': 'Lower content is required',
    }),
  });


  
const update2faSchema = Joi.object({
    is_enabled: Joi.boolean().required().messages({
      'any.required': 'is_enabled field is required',
      'boolean.base': 'is_enabled must be a boolean (true or false)'
    })
  });


module.exports = {updateSettingSchema , updateAboutInformationSchema , update2faSchema};
