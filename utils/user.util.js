const normalizeUser = (user) => {
    user = user.toJSON();

    const fieldsToDelete = [
        '__v',
        'password',
        'role'
    ];

    // eslint-disable-next-line array-callback-return
    fieldsToDelete.map((field) => {
        delete user[field];
    });

    return user;
};

module.exports = {
    normalizeUser
};
