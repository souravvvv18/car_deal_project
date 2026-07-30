const db = require("../config/db");

const BOOKING_STATUSES = ["Pending", "Approved", "Rejected", "Completed"];

const BOOKING_JOIN = `
    SELECT
        b.id,
        b.userId,
        b.carId,
        b.customerName,
        b.phone,
        b.preferredDate,
        b.preferredTime,
        b.status,
        b.created_at,
        u.id AS user_id,
        u.name AS user_name,
        u.email AS user_email,
        c.id AS car_id,
        c.brand AS car_brand,
        c.model AS car_model,
        c.year AS car_year,
        c.price AS car_price,
        c.fuelType AS car_fuelType,
        c.transmission AS car_transmission,
        c.color AS car_color,
        c.imageUrl AS car_imageUrl
    FROM bookings b
    INNER JOIN users u ON b.userId = u.id
    INNER JOIN cars c ON b.carId = c.id
`;

function formatBooking(row) {
    if (!row) return null;

    return {
        id: row.id,
        userId: row.userId,
        carId: row.carId,
        customerName: row.customerName,
        phone: row.phone,
        preferredDate: row.preferredDate,
        preferredTime: row.preferredTime,
        status: row.status,
        created_at: row.created_at,
        user: {
            id: row.user_id,
            name: row.user_name,
            email: row.user_email,
        },
        car: {
            id: row.car_id,
            brand: row.car_brand,
            model: row.car_model,
            year: row.car_year,
            price: row.car_price,
            fuelType: row.car_fuelType,
            transmission: row.car_transmission,
            color: row.car_color,
            imageUrl: row.car_imageUrl,
        },
    };
}

function findAll() {
    const rows = db
        .prepare(`${BOOKING_JOIN} ORDER BY b.created_at DESC`)
        .all();

    return rows.map(formatBooking);
}

function findByUserId(userId) {
    const rows = db
        .prepare(`${BOOKING_JOIN} WHERE b.userId = ? ORDER BY b.created_at DESC`)
        .all(userId);

    return rows.map(formatBooking);
}

function findById(id) {
    const row = db
        .prepare(`${BOOKING_JOIN} WHERE b.id = ?`)
        .get(id);

    return formatBooking(row);
}

function createBooking({ userId, carId, customerName, phone, preferredDate, preferredTime }) {
    const result = db
        .prepare(
            `INSERT INTO bookings (userId, carId, customerName, phone, preferredDate, preferredTime, status)
             VALUES (?, ?, ?, ?, ?, ?, 'Pending')`
        )
        .run(userId, carId, customerName, phone, preferredDate, preferredTime);

    return findById(result.lastInsertRowid);
}

function updateStatus(id, status) {
    const existing = db.prepare("SELECT id FROM bookings WHERE id = ?").get(id);
    if (!existing) {
        return null;
    }

    db.prepare("UPDATE bookings SET status = ? WHERE id = ?").run(status, id);
    return findById(id);
}

function deleteBooking(id) {
    const existing = db.prepare("SELECT id FROM bookings WHERE id = ?").get(id);
    if (!existing) {
        return false;
    }

    db.prepare("DELETE FROM bookings WHERE id = ?").run(id);
    return true;
}

function findRawById(id) {
    return db
        .prepare("SELECT id, userId, carId, status FROM bookings WHERE id = ?")
        .get(id);
}

module.exports = {
    BOOKING_STATUSES,
    findAll,
    findByUserId,
    findById,
    createBooking,
    updateStatus,
    deleteBooking,
    findRawById,
};
