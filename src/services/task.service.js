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

export async function updateTaskById(taskId, technicianId, summary) {
  //Check ownership
  const [rows] = await pool.execute(
    "SELECT technicianId FROM tasks WHERE id = ? LIMIT 1",
    [taskId]
  );

  if (rows.length === 0) {
    throw new Error("Task not found");
  }

  if (rows[0].technicianId !== technicianId) {
    throw new Error("Unauthorized");
  }

  //Update task
  const query = `UPDATE tasks SET summary = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`;

  await pool.execute(query, [summary, taskId]);

  return {
    taskId,
    summary,
  };
}

export async function deleteTaskById(taskId) {
  const [rows] = await pool.execute(
    "SELECT id FROM tasks WHERE id = ? LIMIT 1",
    [taskId]
  );

  if (rows.length === 0) {
    throw new Error("Task not found");
  }

  await pool.execute("DELETE FROM tasks WHERE id = ?", [taskId]);

  return { taskId };
}
