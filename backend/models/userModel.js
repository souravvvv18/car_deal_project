const db = require("../config/db");

const ALLOWED_ROLES = ["customer", "seller", "admin"];

function findByEmail(email) {
    return db
        .prepare("SELECT id, name, email, password, role, created_at FROM users WHERE email = ?")
        .get(email);
}

function findById(id) {
    return db
        .prepare("SELECT id, name, email, role, created_at FROM users WHERE id = ?")
        .get(id);
}

function createUser({ name, email, password, role }) {
    const result = db
        .prepare(
            "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)"
        )
        .run(name, email, password, role);

    return findById(result.lastInsertRowid);
}

module.exports = {
    ALLOWED_ROLES,
    findByEmail,
    findById,
    createUser,
};
