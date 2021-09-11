const { Schema, model } = require('mongoose');
const { ADMIN, USER } = require('../constants/user-roles.enum');
const { dbTablesEnum } = require('../constants');

const User = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: [
            ADMIN,
            USER
        ],
        default: 'user'
    }
}, { timestamps: true });

module.exports = model(dbTablesEnum.USER, User);
