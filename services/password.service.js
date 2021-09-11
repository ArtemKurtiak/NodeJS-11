const bcrypt = require('bcrypt');

const { BAD_REQUEST } = require('../constants/status-codes.enum');
const CustomError = require('../errors/customError');

module.exports = {
    hashPassword: (password) => bcrypt.hash(password, 10),
    comparePasswords: async (password, hashedPassword) => {
        const passwordMatched = await bcrypt.compare(password, hashedPassword);

        if (!passwordMatched) {
            throw new CustomError('Invalid credentials', BAD_REQUEST);
        }
    }
};
