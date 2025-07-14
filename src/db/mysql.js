import mysql from "mysql2/promise";
import { env } from "../config/env.js";

export const pool = mysql.createPool({
  host: env.DB_HOST || "db",
  user: env.DB_USER,
  port: env.DB_PORT || 3306,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, //good for small to medium apps
  queueLimit: 10, //prevent inifinite queueing while handling traffic spikes
});

async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("Database connection successful");
    connection.release();
  } catch (error) {
    console.error("Database connection failed:", error);
  }
}
testConnection();
