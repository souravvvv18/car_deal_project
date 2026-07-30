const db = require("../config/db");

const VEHICLE_COLUMNS =
	"id, make, model, year, price, mileage, color, description, seller_id, status, created_at";

function findAll() {
	return db.prepare(`SELECT ${VEHICLE_COLUMNS} FROM vehicles ORDER BY created_at DESC`).all();
}

function findById(id) {
	return db.prepare(`SELECT ${VEHICLE_COLUMNS} FROM vehicles WHERE id = ?`).get(id);
}

function createVehicle(vehicle) {
	const result = db
		.prepare(
			`INSERT INTO vehicles (make, model, year, price, mileage, color, description, seller_id, status)
			 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
		)
		.run(
			vehicle.make,
			vehicle.model,
			vehicle.year,
			vehicle.price,
			vehicle.mileage ?? null,
			vehicle.color ?? null,
			vehicle.description ?? null,
			vehicle.seller_id ?? null,
			vehicle.status ?? "available"
		);

	return findById(result.lastInsertRowid);
}

function updateVehicle(id, vehicle) {
	const existing = findById(id);
	if (!existing) {
		return null;
	}

	db.prepare(
		`UPDATE vehicles SET
			make = ?,
			model = ?,
			year = ?,
			price = ?,
			mileage = ?,
			color = ?,
			description = ?,
			seller_id = ?,
			status = ?
		 WHERE id = ?`
	).run(
		vehicle.make ?? existing.make,
		vehicle.model ?? existing.model,
		vehicle.year ?? existing.year,
		vehicle.price ?? existing.price,
		vehicle.mileage ?? existing.mileage,
		vehicle.color !== undefined ? vehicle.color : existing.color,
		vehicle.description !== undefined ? vehicle.description : existing.description,
		vehicle.seller_id ?? existing.seller_id,
		vehicle.status ?? existing.status,
		id
	);

	return findById(id);
}

function deleteVehicle(id) {
	const existing = findById(id);
	if (!existing) {
		return false;
	}

	db.prepare("DELETE FROM vehicles WHERE id = ?").run(id);
	return true;
}

module.exports = {
	findAll,
	findById,
	createVehicle,
	updateVehicle,
	deleteVehicle,
};
