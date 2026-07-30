const vehicleModel = require("../models/Vehicle");

function getAllVehicles(req, res) {
	try {
		const vehicles = vehicleModel.findAll();

		return res.status(200).json({
			success: true,
			count: vehicles.length,
			data: { vehicles },
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Failed to fetch vehicles.",
		});
	}
}

function getVehicleById(req, res) {
	try {
		const vehicle = vehicleModel.findById(req.params.id);

		if (!vehicle) {
			return res.status(404).json({
				success: false,
				message: "Vehicle not found.",
			});
		}

		return res.status(200).json({
			success: true,
			data: { vehicle },
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Failed to fetch vehicle.",
		});
	}
}

function createVehicle(req, res) {
	try {
		const vehicle = vehicleModel.createVehicle(req.body);

		return res.status(201).json({
			success: true,
			message: "Vehicle created successfully.",
			data: { vehicle },
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Failed to create vehicle.",
		});
	}
}

function updateVehicle(req, res) {
	try {
		const vehicle = vehicleModel.updateVehicle(req.params.id, req.body);

		if (!vehicle) {
			return res.status(404).json({
				success: false,
				message: "Vehicle not found.",
			});
		}

		return res.status(200).json({
			success: true,
			message: "Vehicle updated successfully.",
			data: { vehicle },
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Failed to update vehicle.",
		});
	}
}

function deleteVehicle(req, res) {
	try {
		const deleted = vehicleModel.deleteVehicle(req.params.id);

		if (!deleted) {
			return res.status(404).json({
				success: false,
				message: "Vehicle not found.",
			});
		}

		return res.status(200).json({
			success: true,
			message: "Vehicle deleted successfully.",
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Failed to delete vehicle.",
		});
	}
}

module.exports = {
	getAllVehicles,
	getVehicleById,
	createVehicle,
	updateVehicle,
	deleteVehicle,
};
