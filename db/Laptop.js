const { Schema, model } = require('mongoose');

const Laptop = new Schema({
    model: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    madeIn: {
        type: String
    },
    photo: {
        type: String
    }
}, { timestamps: true });

module.exports = model('laptop', Laptop);
