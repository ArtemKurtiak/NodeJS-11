const Joi = require('joi');
const { EMAIL_REGEXP, PASSWORD_REGEXP } = require('../constants/constants');
const { ADMIN, USER } = require('../constants/user-roles.enum');

const registerUserValidator = Joi.object({
    email: Joi
        .string()
        .trim()
        .regex(EMAIL_REGEXP)
        .required(),
    password: Joi
        .string()
        .trim()
        .min(8)
        .max(30)
        .regex(PASSWORD_REGEXP)
        .required(),
    role: Joi
        .string()
        .allow(ADMIN, USER)
});

const loginUserValidator = Joi.object({
    email: Joi
        .string()
        .trim()
        .regex(EMAIL_REGEXP)
        .required(),
    password: Joi
        .string()
        .trim()
        .required(),
});

const getUserByIdValidator = Joi.object({
    userId: Joi
        .string()
        .trim()
        .min(24)
        .max(24)
        .required()
});

const updateUserValidator = Joi.object({
    email: Joi
        .string()
        .trim()
        .regex(EMAIL_REGEXP),
    password: Joi
        .string()
        .trim()
        .min(8)
        .max(30)
        .regex(PASSWORD_REGEXP)
});

const resetPassValidator = Joi.object({
    email: Joi
        .string()
        .trim()
        .regex(EMAIL_REGEXP),
    newPassword: Joi
        .string()
        .trim()
        .min(8)
        .max(30)
        .regex(PASSWORD_REGEXP)
        .required(),
    oldPassword: Joi
        .string()
        .required()
});

module.exports = {
    registerUserValidator,
    loginUserValidator,
    getUserByIdValidator,
    updateUserValidator,
    resetPassValidator
};
