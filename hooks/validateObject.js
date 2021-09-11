const validateObject = (schema, object) => {
    const { value, error } = schema.validate(object);
    return [
        value,
        error?.details[0]?.message
    ];
};

module.exports = validateObject;
