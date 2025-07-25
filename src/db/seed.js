import { pool } from "./mysql.js";
import bcrypt from "bcrypt";

async function seed() {
  console.log("Running db seed...");

  await pool.query("DELETE FROM tasks");
  await pool.query("DELETE FROM users");

  const passwordHash = await bcrypt.hash("password123", 12);

  const [managerResult] = await pool.query(
    `INSERT INTO users (name, email, passwordHash, role)
        VALUES ('John Manager', 'john.manager@example.com', ?, 'manager')`,
    [passwordHash]
  );

  const [technicianResult] = await pool.query(
    `INSERT INTO users (name, email, passwordHash, role)
        VALUES ('Jane Technician', 'jane.tech@example.com', ?, 'technician')`,
    [passwordHash]
  );

  const technicianId = technicianResult.insertId;

  await pool.query(
    `
    INSERT INTO tasks (summary, performedAt, technicianId)
    VALUES ('Test seed task', '2025-07-15 10:00:00', ?)`,
    [technicianId]
  );

  console.log("DB seed completed");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
