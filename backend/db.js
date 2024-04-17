const postgres = require("postgres");
const dotenv = require("dotenv");
dotenv.config();

const connectionString = process.env.DB_URL;
const db = postgres(connectionString);

module.exports = { db };
