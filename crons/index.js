const nodeCron = require('node-cron');
const { getAveragePrice } = require('./laptops.cron');

module.exports = () => {
    nodeCron.schedule('0 0 * * *', () => {
        getAveragePrice();
    });
};
