const router = require('express').Router();

const { checkAccessToken } = require('../middlewares/auth.middleware');
const {
    getAllLaptops, createLaptop, updateLaptop, deleteLaptop, getLaptopById
} = require('../controllers/laptop.controller');
const {
    isFullDataInLaptopRequest, isUpdateLaptopDataSent, isLaptopIdFormatCorrect,
    checkLaptopAvailability, isLaptopExists
} = require('../middlewares/laptop.middleware');

router.use(checkAccessToken);

router.get('/', getAllLaptops);

router.post('/', isFullDataInLaptopRequest, createLaptop);

router.use('/:laptopId', isLaptopIdFormatCorrect, checkLaptopAvailability('laptopId', 'params', '_id'), isLaptopExists);

router.get('/:laptopId', getLaptopById);

router.patch('/:laptopId', isUpdateLaptopDataSent, updateLaptop);

router.delete('/:laptopId', deleteLaptop);

module.exports = router;
