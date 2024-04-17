import postgres from "postgres";
import dotenv from "dotenv";
dotenv.config();

const connectionString = process.env.DB_URL;
export const db = postgres(connectionString);
