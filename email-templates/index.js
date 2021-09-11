const {
    registerCongrats, goodBye, forgotPass, creationNotification, averageLaptopsPrice
} = require('../constants/letter-types.enum');

module.exports = {
    [registerCongrats]: {
        templateName: 'registerSuccess',
        config: {
            subject: 'Success registration'
        }
    },
    [goodBye]: {
        templateName: 'bye',
        config: {
            subject: 'Bye lovely user'
        }
    },
    [forgotPass]: {
        templateName: 'forgotPass',
        config: {
            subject: 'Confirm password reset'
        }
    },
    [creationNotification]: {
        templateName: 'creationNotification',
        config: {
            subject: 'Your email was used to create admin on website'
        }
    },
    [averageLaptopsPrice]: {
        templateName: 'averagePrice',
        config: {
            subject: 'Average price of last 10 laptops'
        }
    }
};
