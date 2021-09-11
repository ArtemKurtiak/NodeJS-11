const { Laptop } = require('../db');
const { CREATED } = require('../constants/status-codes.enum');
const { uploadLaptopPhoto } = require('../services/s3.service');
const { photosTypesEnum } = require('../constants');

module.exports = {
    getAllLaptops: async (req, res, next) => {
        try {
            const laptops = await Laptop.find({}).select('-__v');

            res
                .json(laptops);
        } catch (e) {
            next(e);
        }
    },

    createLaptop: async (req, res, next) => {
        try {
            const { _id } = await Laptop.create({
                ...req.body
            });

            if (req.files && req.files.photo) {
                const { photo } = req.files;

                const response = await uploadLaptopPhoto(photo, photosTypesEnum.LAPTOP, _id);

                await Laptop.findByIdAndUpdate(_id, { photo: response.Location });
            }

            res
                .status(CREATED)
                .json({ message: 'Created' });
        } catch (e) {
            next(e);
        }
    },

    updateLaptop: async (req, res, next) => {
        try {
            const { laptopId } = req.params;

            await Laptop.findByIdAndUpdate(laptopId, { ...req.body });

            res
                .json({ message: 'Updated' });
        } catch (e) {
            next(e);
        }
    },

    deleteLaptop: async (req, res, next) => {
        try {
            const { laptopId } = req.params;

            await Laptop.findByIdAndDelete(laptopId);

            res
                .json({ message: 'Deleted' });
        } catch (e) {
            next(e);
        }
    },

    getLaptopById: async (req, res, next) => {
        try {
            const { laptopId } = req.params;

            const laptop = await Laptop.findById(laptopId).select('-__v');

            res
                .json(laptop);
        } catch (e) {
            next(e);
        }
    }
};
