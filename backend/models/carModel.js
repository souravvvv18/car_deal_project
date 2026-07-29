const db = require("../config/db");

const CAR_COLUMNS =
    "id, brand, model, year, price, fuelType, transmission, kilometersDriven, color, description, imageUrl, created_at";

function findAll(filters = {}) {
    const conditions = [];
    const params = [];

    if (filters.search) {
        conditions.push("(brand LIKE ? OR model LIKE ?)");
        const term = `%${filters.search}%`;
        params.push(term, term);
    }

    if (filters.brand) {
        conditions.push("brand LIKE ?");
        params.push(`%${filters.brand}%`);
    }

    if (filters.model) {
        conditions.push("model LIKE ?");
        params.push(`%${filters.model}%`);
    }

    if (filters.minPrice !== undefined) {
        conditions.push("price >= ?");
        params.push(filters.minPrice);
    }

    if (filters.maxPrice !== undefined) {
        conditions.push("price <= ?");
        params.push(filters.maxPrice);
    }

    if (filters.fuelType) {
        conditions.push("fuelType = ?");
        params.push(filters.fuelType);
    }

    if (filters.transmission) {
        conditions.push("transmission = ?");
        params.push(filters.transmission);
    }

    if (filters.year !== undefined) {
        conditions.push("year = ?");
        params.push(filters.year);
    }

    if (filters.minYear !== undefined) {
        conditions.push("year >= ?");
        params.push(filters.minYear);
    }

    if (filters.maxYear !== undefined) {
        conditions.push("year <= ?");
        params.push(filters.maxYear);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    return db
        .prepare(`SELECT ${CAR_COLUMNS} FROM cars ${whereClause} ORDER BY created_at DESC`)
        .all(...params);
}

function findById(id) {
    return db.prepare(`SELECT ${CAR_COLUMNS} FROM cars WHERE id = ?`).get(id);
}

function createCar(car) {
    const result = db
        .prepare(
            `INSERT INTO cars (brand, model, year, price, fuelType, transmission, kilometersDriven, color, description, imageUrl)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        )
        .run(
            car.brand,
            car.model,
            car.year,
            car.price,
            car.fuelType,
            car.transmission,
            car.kilometersDriven ?? 0,
            car.color ?? null,
            car.description ?? null,
            car.imageUrl ?? null
        );

    return findById(result.lastInsertRowid);
}

function updateCar(id, car) {
    const existing = findById(id);
    if (!existing) {
        return null;
    }

    db.prepare(
        `UPDATE cars SET
            brand = ?,
            model = ?,
            year = ?,
            price = ?,
            fuelType = ?,
            transmission = ?,
            kilometersDriven = ?,
            color = ?,
            description = ?,
            imageUrl = ?
         WHERE id = ?`
    ).run(
        car.brand ?? existing.brand,
        car.model ?? existing.model,
        car.year ?? existing.year,
        car.price ?? existing.price,
        car.fuelType ?? existing.fuelType,
        car.transmission ?? existing.transmission,
        car.kilometersDriven ?? existing.kilometersDriven,
        car.color !== undefined ? car.color : existing.color,
        car.description !== undefined ? car.description : existing.description,
        car.imageUrl !== undefined ? car.imageUrl : existing.imageUrl,
        id
    );

    return findById(id);
}

function deleteCar(id) {
    const existing = findById(id);
    if (!existing) {
        return false;
    }

    db.prepare("DELETE FROM cars WHERE id = ?").run(id);
    return true;
}

module.exports = {
    findAll,
    findById,
    createCar,
    updateCar,
    deleteCar,
};
