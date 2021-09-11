const { Schema, model } = require('mongoose');
const { dbTablesEnum } = require('../constants');

const OAuthSchema = new Schema({
    accessToken: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: dbTablesEnum.USER,
        required: true
    }
});

module.exports = model(dbTablesEnum.OAUTH, OAuthSchema);
