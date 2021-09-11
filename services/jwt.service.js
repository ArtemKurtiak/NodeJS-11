const jwt = require('jsonwebtoken');

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, RESET_PASS_ACTION_TOKEN_SECRET } = require('../constants/constants');
const CustomError = require('../errors/customError');
const { NOT_AUTHORIZED, BAD_REQUEST } = require('../constants/status-codes.enum');

module.exports = {
    generateTokens: () => {
        const accessToken = jwt.sign({}, ACCESS_TOKEN_SECRET, {
            expiresIn: '15m'
        });

        const refreshToken = jwt.sign({}, REFRESH_TOKEN_SECRET, {
            expiresIn: '15d'
        });

        return {
            accessToken,
            refreshToken
        };
    },

    validateToken: (token, typeOfToken = 'access') => {
        try {
            // sorry for this :))
            // eslint-disable-next-line no-nested-ternary
            const jwtSecretKey = typeOfToken === 'access'
                ? ACCESS_TOKEN_SECRET : typeOfToken === 'refresh'
                    ? REFRESH_TOKEN_SECRET : RESET_PASS_ACTION_TOKEN_SECRET;

            jwt.verify(token, jwtSecretKey);
        } catch (e) {
            throw new CustomError('Invalid token', NOT_AUTHORIZED);
        }
    },

    generateActionToken: () => {
        try {
            const actionToken = jwt.sign({}, RESET_PASS_ACTION_TOKEN_SECRET, {
                expiresIn: '15m'
            });

            return actionToken;
        } catch (e) {
            throw new CustomError('Invalid data', BAD_REQUEST);
        }
    }
};
