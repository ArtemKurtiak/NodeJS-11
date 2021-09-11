const nodeCron = require('node-cron');
const { getAvgLaptopsPrice } = require('./laptops.cron');

module.exports = () => {
    nodeCron.schedule('*/10 * * * * *', () => {
        getAvgLaptopsPrice();
    });
};
