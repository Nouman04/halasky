const Joi = require("joi");


const listValidationSchema = Joi.object({
  pageNo: Joi.number().integer().min(1).required().messages({
    "number.base": `"pageNo" must be a number`,
    "number.min": `"pageNo" must be at least 1`,
    "any.required": `"pageNo" is required`,
  }),
  status: Joi.number().integer().optional().messages({
    "number.base": `"status" must be a number (0 or 1)`,
  }),
});



const listUsersValidationSchema = Joi.object({
  pageNo: Joi.number().integer().min(1).required().messages({
    "number.base": `"pageNo" must be a number`,
    "any.required": `"pageNo" is required`,
  }),
});



const nonActiveUserValidationSchema = Joi.object({
  pageNo: Joi.number().integer().min(1).required().messages({
    "number.base": `"pageNo" must be a number`,
    "any.required": `"pageNo" is required`,
  }),
});



const searchUserValidationSchema = Joi.object({
  searchQuery: Joi.string().trim().min(2).max(100).required().messages({
    "string.base": `"searchQuery" must be text`,
    "string.min": `"searchQuery" must be at least {#limit} characters`,
    "string.max": `"searchQuery" must be at most {#limit} characters`,
    "any.required": `"searchQuery" is required`,
  }),
});



const updateAccountStatusValidationSchema = Joi.object({
  userId: Joi.number().integer().positive().required().messages({
    "number.base": `"userId" must be a number`,
    "number.positive": `"userId" must be positive`,
    "any.required": `"userId" is required`,
  }),
  status: Joi.number().integer().required().messages({
    "number.base": `"status" must be a number`,
    "any.only": `"status" must be one of [0,1,2]`,
    "any.required": `"status" is required`,
  }),
});



const updateAccountPasswordValidationSchema = Joi.object({
  id: Joi.number().integer().positive().required().messages({
    "number.base": `"id" must be a number`,
    "any.required": `"id" is required`,
  }),
  password: Joi.string().min(6).max(100).required().messages({
    "string.base": `"password" must be text`,
    "string.min": `"password" must have at least {#limit} characters`,
    "any.required": `"password" is required`,
  }),
  userId: Joi.number().integer().positive().required().messages({
    "number.base": `"userId" must be a number`,
    "any.required": `"userId" is required`,
  }),
});



const userAccountDetailValidationSchema = Joi.object({
  id: Joi.number().integer().positive().required().messages({
    "number.base": `"id" must be a number`,
    "any.required": `"id" is required`,
  }),
});



const getMembersValidationSchema = Joi.object({
  pageNo: Joi.number().integer().min(1).required().messages({
    "number.base": `"pageNo" must be a number`,
    "any.required": `"pageNo" is required`,
  }),
  status: Joi.number().integer().required().messages({
    "number.base": `"status" must be a number`,
    "any.required": `"status" is required`,
  }),
});



const getRoleMembersValidationSchema = Joi.object({
  pageNo: Joi.number().integer().min(1).required().messages({
    "number.base": `"pageNo" must be a number`,
    "any.required": `"pageNo" is required`,
  }),
  roleId: Joi.number().integer().positive().required().messages({
    "number.base": `"roleId" must be a number`,
    "any.required": `"roleId" is required`,
  }),
  status: Joi.number().integer().required().messages({
    "number.base": `"status" must be a number`,
    "any.required": `"status" is required`,
  }),
});



const updateUserRoleValidationSchema = Joi.object({
  uId: Joi.number().integer().positive().required().messages({
    "number.base": `"uId" must be a number`,
    "any.required": `"uId" is required`,
  }),
  rId: Joi.number().integer().positive().required().messages({
    "number.base": `"rId" must be a number`,
    "any.required": `"rId" is required`,
  }),
});



const addMemberValidationSchema = Joi.object({
  name: Joi.string().trim().min(3).max(100).required().messages({
    "string.base": `"name" must be a string`,
    "string.min": `"name" must be at least {#limit} characters`,
    "any.required": `"name" is required`,
  }),
  email: Joi.string().email().required().messages({
    "string.email": `"email" must be a valid email address`,
    "any.required": `"email" is required`,
  }),
  roleId: Joi.number().integer().positive().required().messages({
    "number.base": `"roleId" must be a number`,
    "any.required": `"roleId" is required`,
  }),
  userId: Joi.number().integer().positive().required().messages({
    "number.base": `"userId" must be a number`,
    "any.required": `"userId" is required`,
  }),
});



const userRecoveryRequestValidationSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": `"email" must be valid`,
    "any.required": `"email" is required`,
  }),
});



const getRecoveryRequestsValidationSchema = Joi.object({
  pageNo: Joi.number().integer().min(1).required().messages({
    "number.base": `"pageNo" must be a number`,
    "any.required": `"pageNo" is required`,
  }),
  status: Joi.number().integer().optional(),
});



const updateRecoveryRequestValidationSchema = Joi.object({
  uId: Joi.number().integer().positive().required().messages({
    "number.base": `"uId" must be a number`,
    "any.required": `"uId" is required`,
  }),
  status: Joi.number().integer().required().messages({
    "number.base": `"status" must be a number`,
    "any.required": `"status" is required`,
  }),
  userId: Joi.number().integer().positive().required().messages({
    "number.base": `"userId" must be a number`,
    "any.required": `"userId" is required`,
  }),
});



const updateProfilePasswordValidationSchema = Joi.object({
  previousPassword: Joi.string().min(6).max(100).required().messages({
    "string.base": `"previousPassword" must be text`,
    "any.required": `"previousPassword" is required`,
  }),
  password: Joi.string().min(6).max(100).required().messages({
    "string.base": `"password" must be text`,
    "any.required": `"password" is required`,
  }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": `"confirmPassword" must match "password"`,
    "any.required": `"confirmPassword" is required`,
  }),
});


const updateProfileDetailValidationSchema = Joi.object({
  username: Joi.string().trim().min(3).max(100).required().messages({
    "string.base": `"username" must be text`,
    "any.required": `"username" is required`,
  }),
  phone: Joi.string().trim().pattern(/^[0-9]{10,15}$/).required().messages({
    "string.pattern.base": `"phone" must contain 10–15 digits`,
    "any.required": `"phone" is required`,
  }),
});


module.exports = {
  listValidationSchema,
  listUsersValidationSchema,
  nonActiveUserValidationSchema,
  searchUserValidationSchema,
  updateAccountStatusValidationSchema,
  updateAccountPasswordValidationSchema,
  userAccountDetailValidationSchema,
  getMembersValidationSchema,
  getRoleMembersValidationSchema,
  updateUserRoleValidationSchema,
  addMemberValidationSchema,
  userRecoveryRequestValidationSchema,
  getRecoveryRequestsValidationSchema,
  updateRecoveryRequestValidationSchema,
  updateProfilePasswordValidationSchema,
  updateProfileDetailValidationSchema,
};
