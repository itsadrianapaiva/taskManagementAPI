import {
  deleteTaskById,
  getTasksByRole,
  updateTaskById,
} from "../services/task.service.js";
import { createTask as createTaskService } from "../services/task.service.js";
import { notificationQueue } from "../queues/notification.queue.js";

export async function createTask(req, res, next) {
  try {
    const { summary, performedAt } = req.body;
    const technicianId = req.user.id;

    const task = await createTaskService(summary, performedAt, technicianId);

    await notificationQueue.add("notify", {
      techId: req.user.id,
      taskId: task.taskId,
      date: performedAt,
    });

    res.status(201).json({
      ...task,
      message: "Task registered successfully",
    });
  } catch (error) {
    next(error);
  }
}

export async function getTasks(req, res, next) {
  try {
    const tasks = await getTasksByRole(req.user);
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
}

export async function updateTask(req, res, next) {
  try {
    const { summary } = req.body;
    const taskId = req.params.id;
    const technicianId = req.user.id;

    const updateTask = await updateTaskById(taskId, technicianId, summary);

    await notificationQueue.add("notify", {
      techId: req.user.id,
      taskId: updateTask.taskId,
      date: new Date().toISOString(),
    });

    res.status(200).json({
      ...updateTask,
      message: "Task updated successfully",
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteTask(req, res, next) {
  try {
    const taskId = req.params.id;

    const result = await deleteTaskById(taskId);
    res.status(200).json({
      ...result,
      message: "Task deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}
