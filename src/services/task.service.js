import { pool } from "../db/mysql.js";

export async function createTask(summary, performedAt, technicianId) {
  const query =
    "INSERT INTO tasks (summary, performedAt, technicianId) VALUES (?, ?, ?)";

  const [result] = await pool.execute(query, [
    summary,
    performedAt,
    technicianId,
  ]);

  return {
    taskId: result.insertId,
    summary,
    performedAt,
    technicianId,
  };
}

export async function getTasksByRole(user) {
  //base query for managers
  let query = "SELECT id, summary, performedAt, technicianId FROM tasks";
  let params = [];

  //technicians only see their own tasks
  if (user.role === "technician") {
    query += " WHERE technicianId = ?";
    params.push(user.id);
  }

  const [rows] = await pool.execute(query, params);
  return rows;
}
