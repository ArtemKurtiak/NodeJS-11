const CustomError = require('../errors/customError');
const { NOT_AUTHORIZED } = require('../constants/status-codes.enum');
const { validateToken } = require('../services/jwt.service');
const { OAuth, ActionToken } = require('../db');
const { dbTablesEnum } = require('../constants');

module.exports = {
    checkAccessToken: async (req, res, next) => {
        try {
            const token = req.get('Authorization');

            if (!token) {
                throw new CustomError('JWT Token not found', NOT_AUTHORIZED);
            }

            await validateToken(token);

            const DbToken = await OAuth.findOne({ accessToken: token }).populate(dbTablesEnum.USER);

            if (!DbToken) {
                throw new CustomError('Invalid token', NOT_AUTHORIZED);
            }

            req.currentUser = DbToken.user;
            req.token = DbToken;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const token = req.get('Authorization');

            if (!token) {
                throw new CustomError('JWT Token not found', NOT_AUTHORIZED);
            }

            await validateToken(token, 'refresh');

            req.token = token;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkActionToken: async (req, res, next) => {
        try {
            const { actionToken } = req.query;

            if (!actionToken) {
                throw new CustomError('Action Token not found', NOT_AUTHORIZED);
            }

            await validateToken(actionToken, 'action');

            const DbActionToken = await ActionToken.findOne({ actionToken }).populate(dbTablesEnum.USER);

            if (!DbActionToken) {
                throw new CustomError('Invalid token', NOT_AUTHORIZED);
            }

            req.currentUser = DbActionToken.user;
            req.actionToken = DbActionToken;

            next();
        } catch (e) {
            next(e);
        }
    }
};
