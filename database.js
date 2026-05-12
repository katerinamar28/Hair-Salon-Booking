const sqlite3 = require("sqlite3").verbose();

//Creating a reservations database
const db = new sqlite3.Database("reservations.db");

//SQL statement to create a table
const createReservationTable = `
CREATE TABLE IF NOT EXISTS reservations (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	service TEXT NOT NULL,
    specialist TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    name TEXT NOT NULL,
    UNIQUE(specialist, date, time)
)
`; 
//Unique constraint - one specialist cant have the same date and time twice

//Executing SQL statement to create a table
db.run(createReservationTable);

//Making database accessible to other files
module.exports = db;