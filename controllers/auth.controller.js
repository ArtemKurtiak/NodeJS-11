const CustomError = require('../errors/customError');
const {
    CREATED, NOT_AUTHORIZED, NO_CONTENT
} = require('../constants/status-codes.enum');
const { User, OAuth, ActionToken } = require('../db');
const { normalizeUser } = require('../utils/user.util');
const { forgotPass } = require('../constants/letter-types.enum');
const { passwordService, jwtService, emailService } = require('../services');
const { FORGET_PASS_FRONT_URL } = require('../constants/constants');

module.exports = {

    register: async (req, res, next) => {
        try {
            const { email, password, role } = req.body;

            const hashedPassword = await passwordService.hashPassword(password);

            const user = await User.create({
                email,
                password: hashedPassword,
                role
            });

            const normalizedUser = normalizeUser(user);

            const tokenPair = jwtService.generateTokens();

            await OAuth.create({
                ...tokenPair,
                user: user._id
            });

            await emailService.sendEmail(email);

            res
                .status(CREATED)
                .json({ normalizedUser, ...tokenPair });
        } catch (e) {
            return next(e);
        }
    },

    login: async (req, res, next) => {
        try {
            const { user, body: { password } } = req;

            await passwordService.comparePasswords(password, user.password);

            const normalizedUser = normalizeUser(user);

            const tokenPair = jwtService.generateTokens();

            await OAuth.create({
                ...tokenPair,
                user: user._id
            });

            res
                .json({ normalizedUser, ...tokenPair });
        } catch (e) {
            return next(e);
        }
    },

    refreshToken: async (req, res, next) => {
        try {
            const { token } = req;

            const newTokenPair = jwtService.generateTokens();

            const DbToken = await OAuth.findOneAndUpdate({ refreshToken: token }, { ...newTokenPair });

            if (!DbToken) {
                throw new CustomError('Invalid token', NOT_AUTHORIZED);
            }

            res
                .status(200)
                .json({
                    ...newTokenPair
                });
        } catch (e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
            const token = req.get('Authorization');
            const {
                currentUser: {
                    email
                }
            } = req;

            if (!token) {
                throw new CustomError('JWT Token not found', NOT_AUTHORIZED);
            }

            await OAuth.deleteOne({ accessToken: token });

            await emailService.sendLogoutEmail(email, { email });

            res
                .status(NO_CONTENT)
                .json('Success');
        } catch (e) {
            next(e);
        }
    },

    logoutEverywhere: async (req, res, next) => {
        try {
            const { currentUser } = req;
            const { email } = currentUser;

            await OAuth.deleteMany({ user: currentUser });

            await emailService.sendLogoutEmail(email, { email });

            res
                .status(NO_CONTENT)
                .json('Success');
        } catch (e) {
            next(e);
        }
    },

    forgotPassword: async (req, res, next) => {
        try {
            const { user } = req;

            const token = jwtService.generateActionToken();

            await ActionToken.create({
                token,
                user
            });

            await emailService.sendEmail(user.email, forgotPass, {
                url: `${FORGET_PASS_FRONT_URL}/auth/reset_password?actionToken=${token}`
            });

            res.status(NO_CONTENT).json('Success');
        } catch (e) {
            next(e);
        }
    },

    resetPassword: async (req, res, next) => {
        try {
            const { oldPassword, newPassword } = req.body;
            const { user, actionToken } = req;

            await passwordService.comparePasswords(oldPassword, user.password);

            const newHashedPassword = await passwordService.hashPassword(newPassword);

            await User.findOneAndUpdate({ email: user.email }, {
                password: newHashedPassword
            });

            await OAuth.deleteMany({ email: user.email });

            await ActionToken.deleteOne({ token: actionToken.token });

            res
                .status(NO_CONTENT)
                .json('Success');
        } catch (e) {
            next(e);
        }
    },
};
