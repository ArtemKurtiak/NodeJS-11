const { Schema, model } = require('mongoose');
const { dbTablesEnum } = require('../constants');

const ActionTokenSchema = new Schema({
    token: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: dbTablesEnum.USER,
        required: true
    }
});

module.exports = model(dbTablesEnum.ACTION_TOKEN, ActionTokenSchema);
