const CustomError = require('../errors/customError');
const {
    CONFLICT, BAD_REQUEST, NOT_FOUND, FORBIDDEN
} = require('../constants/status-codes.enum');
const { User } = require('../db');
const {
    registerUserValidator, loginUserValidator, getUserByIdValidator, updateUserValidator, resetPassValidator
} = require('../validators/user.validator');
const validateObject = require('../hooks/validateObject');
const {ADMIN} = require("../constants/user-roles.enum");

module.exports = {
    isFullDataInUserRequest: (req, res, next) => {
        try {
            const [
                errorValue,
                errorMessage
            ] = validateObject(registerUserValidator, req.body);
            if (errorMessage) {
                throw new CustomError(errorMessage, BAD_REQUEST);
            }
            req.body = errorValue;

            next();
        } catch (e) {
            next(e);
        }
    },

    isLoginBodyCorrect: (req, res, next) => {
        try {
            // eslint-disable-next-line
            const [, errorMessage] = validateObject(loginUserValidator, req.body);
            if (errorMessage) {
                throw new CustomError(errorMessage, BAD_REQUEST);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserIdFormatCorrect: (req, res, next) => {
        try {
            // eslint-disable-next-line
            const [, errorMessage] = validateObject(getUserByIdValidator, req.params);
            if (errorMessage) {
                throw new CustomError(errorMessage, BAD_REQUEST);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUpdateUserDataSent: (req, res, next) => {
        try {
            // eslint-disable-next-line
            const [, errorMessage] = validateObject(updateUserValidator, req.body);
            if (errorMessage) {
                throw new CustomError(errorMessage, BAD_REQUEST);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserAvailability: (paramKey, findObject = 'body', paramDbKey = paramKey) => async (req, res, next) => {
        try {
            const paramValue = req[findObject][paramKey];

            const user = await User.findOne({ [paramDbKey]: paramValue });

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserExists: (req, res, next) => {
        try {
            const { user } = req;

            if (!user) {
                throw new CustomError('User not found', NOT_FOUND);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserNotExists: (req, res, next) => {
        try {
            const { user } = req;

            if (user) {
                throw new CustomError('Email already in use', CONFLICT);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserPermission: (req, res, next) => {
        try {
            const { token } = req;
            const { userId } = req.params;

            if (token?.user?._id?.toString() !== userId) {
                throw new CustomError('Forbidden', 403);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isResetPassDataInRequest: async (req, res, next) => {
        try {
            // eslint-disable-next-line
            const [, errorMessage] = validateObject(resetPassValidator, req.body);
            if (errorMessage) {
                throw new CustomError(errorMessage, BAD_REQUEST);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserAdmin: (req, res, next) => {
        try {
            const { currentUser: user } = req;

            if (user.role !== ADMIN) {
                throw new CustomError('Forbidden', FORBIDDEN);
            }

            next();
        } catch (e) {
            next(e);
        }

    }
};
