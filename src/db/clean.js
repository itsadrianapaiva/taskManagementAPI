// This script clears the database tables for tasks and users.

import { pool } from "./mysql.js";

async function clean() {
  console.log("Cleaning DB tables...");
  await pool.query("DELETE FROM tasks");
  await pool.query("DELETE FROM users");
  console.log("DB tables cleared successfully");
  process.exit(0);
}

clean().catch((err) => {
  console.error("Clean failed:", err);
  process.exit(1);
});
