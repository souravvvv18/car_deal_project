const Database = require("better-sqlite3");
const fs = require("fs");
const path = require("path");

const dbPath =
    process.env.DB_PATH ||
    path.join(__dirname, "..", "database", "car_deal.db");

const dbDir = path.dirname(dbPath);

if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
}

const db = new Database(dbPath);

db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

module.exports = db;
