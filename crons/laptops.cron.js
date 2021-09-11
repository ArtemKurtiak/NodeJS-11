const { averageLaptopsPrice } = require('../constants/letter-types.enum');
const { CRON_JOBS_SEND_EMAIL } = require('../constants/constants');
const { Laptop } = require('../db');
const { sendEmail } = require('../services/email.service');

module.exports = {
    getAvgLaptopsPrice: async () => {
        const laptops = await Laptop.find({}).limit(10);

        const sumOfPrices = laptops.reduce((previousValue, currentValue) => previousValue + currentValue.price, 0);

        const averagePrice = sumOfPrices / laptops.length;

        await sendEmail(CRON_JOBS_SEND_EMAIL, averageLaptopsPrice, { priceData: averagePrice });
    }
};
