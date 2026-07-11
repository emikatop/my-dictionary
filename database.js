const Database = require('better-sqlite3');
const db = new Database('words.db');

db.exec(`CREATE TABLE IF NOT EXISTS words (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    word TEXT NOT NULL,
    example TEXT,
    translation TEXT NOT NULL
    )`);

module.exports = db;