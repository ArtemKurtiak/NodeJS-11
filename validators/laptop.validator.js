const Joi = require('joi');

const getLaptopByIdValidator = Joi.object({
    laptopId: Joi
        .string()
        .trim()
        .min(24)
        .max(24)
        .required()
});

const createLaptopValidator = Joi.object({
    model: Joi
        .string()
        .trim()
        .required(),
    price: Joi
        .number()
        .required(),
    madeIn: Joi
        .string()
});

const updateLaptopValidator = Joi.object({
    model: Joi
        .string()
        .trim(),
    price: Joi
        .number(),
    madeIn: Joi
        .string()
});

module.exports = {
    getLaptopByIdValidator,
    createLaptopValidator,
    updateLaptopValidator
};
