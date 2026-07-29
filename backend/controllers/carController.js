const carModel = require("../models/carModel");
const { parseCarFilters } = require("../middleware/validateCar");

function getAllCars(req, res) {
    try {
        const filters = parseCarFilters(req.query);
        const cars = carModel.findAll(filters);

        return res.status(200).json({
            success: true,
            count: cars.length,
            data: { cars },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch cars.",
        });
    }
}

function getCarById(req, res) {
    try {
        const car = carModel.findById(req.params.id);

        if (!car) {
            return res.status(404).json({
                success: false,
                message: "Car not found.",
            });
        }

        return res.status(200).json({
            success: true,
            data: { car },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch car.",
        });
    }
}

function createCar(req, res) {
    try {
        const car = carModel.createCar(req.body);

        return res.status(201).json({
            success: true,
            message: "Car created successfully.",
            data: { car },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to create car.",
        });
    }
}

function updateCar(req, res) {
    try {
        const car = carModel.updateCar(req.params.id, req.body);

        if (!car) {
            return res.status(404).json({
                success: false,
                message: "Car not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Car updated successfully.",
            data: { car },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to update car.",
        });
    }
}

function deleteCar(req, res) {
    try {
        const deleted = carModel.deleteCar(req.params.id);

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Car not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Car deleted successfully.",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to delete car.",
        });
    }
}

module.exports = {
    getAllCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar,
};
