const postgres = require("postgres");
const dotenv = require("dotenv");
dotenv.config();

const connectionString = process.env.DB_URL;

if (!connectionString) {
  throw new Error("DB_URL is not defined");
}

const db = postgres(connectionString, {
  ssl: "require",
  max: 1,
  idle_timeout: 20,
  connect_timeout: 10,
});

module.exports = { db };
