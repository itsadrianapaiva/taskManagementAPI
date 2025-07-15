import { getTasksByRole } from "../services/task.service.js";
import { createTask as createTaskService } from "../services/task.service.js";

export async function createTask(req, res, next) {
  try {
    const { summary, performedAt } = req.body;
    const technicianId = req.user.id;

    const task = await createTaskService(summary, performedAt, technicianId);

    res.status(201).json({
      ...task,
      message: "Task registered successfully",
    });
  } catch (error) {
    next(error);
  }
}

export async function getTasks(req, res) {
  try {
    const tasks = await getTasksByRole(req.user);
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
}

export function updateTask(req, res) {
  res.status(200).json({
    message: `Task ${req.params.id} updated (placeholder)`,
    user: req.user,
  });
}

export function deleteTask(req, res) {
  res.status(200).json({
    message: `Task ${req.params.id} deleted (placeholder)`,
    user: req.user,
  });
}
