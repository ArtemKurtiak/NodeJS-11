const { DEFAULT_ADMIN_EMAIL, DEFAULT_ADMIN_PASSWORD } = require('../constants/constants');
const { User } = require('../db');
const { ADMIN } = require('../constants/user-roles.enum');
const { hashPassword } = require('./password.service');

module.exports = {
    createDefaultAdmin: async () => {
        try {
            const user = await User.findOne({ role: ADMIN });

            if (!user) {
                const hashedPassword = await hashPassword(DEFAULT_ADMIN_PASSWORD);

                await User.create({
                    email: DEFAULT_ADMIN_EMAIL,
                    password: hashedPassword,
                    role: ADMIN
                });
            }
        } catch (e) {
            console.log(e);
        }
    }
};
