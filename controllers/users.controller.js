const { ADMIN } = require('../constants/user-roles.enum');
const CustomError = require('../errors/customError');
const { CREATED, BAD_REQUEST } = require('../constants/status-codes.enum');
const { normalizeUser } = require('../utils/user.util');
const { passwordService, jwtService } = require('../services');
const { User, ActionToken } = require('../db');
const { sendEmail } = require('../services/email.service');
const { creationNotification } = require('../constants/letter-types.enum');
const { FORGET_PASS_FRONT_URL } = require('../constants/constants');

module.exports = {

    getAllUsers: async (req, res, next) => {
        try {
            const users = await User.find({}).select('-password -__v -role');

            res
                .json(users);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            // if body don't have role, user schema has default value for role
            const { email, password, role } = req.body;

            await User.create({
                email,
                password,
                role
            });

            res
                .status(CREATED)
                .json({
                    message: 'Success'
                });
        } catch (e) {
            return next(e);
        }
    },

    getUserById: (req, res, next) => {
        try {
            const { user } = req;

            const normalizedUser = normalizeUser(user);

            res
                .json(normalizedUser);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const { userId } = req.params;

            await User.findByIdAndDelete(userId);

            res
                .json({ message: 'Deleted' });
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const { userId } = req.params;
            const { ...userData } = req.body;

            await User.findByIdAndUpdate(userId, userData);

            res
                .json({ message: 'Updated' });
        } catch (e) {
            next(e);
        }
    },

    createAdmin: async (req, res, next) => {
        try {
            const { email, password, role } = req.body;

            if (role !== ADMIN) {
                throw new CustomError('You can create only admins', BAD_REQUEST);
            }

            const hashedPassword = await passwordService.hashPassword(password);

            const createdUser = await User.create({
                email,
                password: hashedPassword,
                role
            });

            const token = jwtService.generateActionToken();

            await ActionToken.create({
                token,
                user: createdUser._id
            });

            await sendEmail(email, creationNotification, {
                email,
                frontUrl: `${FORGET_PASS_FRONT_URL}/auth/reset_password?actionToken=${token}`
            });

            res
                .status(CREATED)
                .json({
                    message: 'Success'
                });
        } catch (e) {
            next(e);
        }
    }
};
