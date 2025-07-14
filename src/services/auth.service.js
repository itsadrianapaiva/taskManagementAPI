import bcrypt from "bcrypt";
import { pool } from "../db/mysql.js";

export async function createUser({ name, email, password, role }) {
  const passwordHash = await bcrypt.hash(password, 12);

  const query = `INSERT INTO users (name, email, passwordHash, role)
    VALUES (?, ?, ?, ?)
    `;

  try {
    const [result] = await pool.execute(query, [
      name,
      email,
      passwordHash,
      role,
    ]);
    return {
      id: result.insertId,
      name,
      email,
      role,
    };
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      throw new Error("Email already exists");
    }
    throw error;
  }
}

export async function getUserByEmail(email) {
  const query = `SELECT * FROM users WHERE email = ? LIMIT 1`;

  const [rows] = await pool.execute(query, [email]);

  if (rows.length === 0) return null;

  return rows[0];
}
