import bcrypt from "bcrypt";
import { pool } from "../db/mysql.js";

export async function createUser({ name, email, password, role }) {
  const passwordHash = await bcrypt.hash(password, 12);

  // SQL Insert Query
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
