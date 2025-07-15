import { Router } from 'express';
import { protect } from '../middlewares/protect.js';
import { authorize } from '../middlewares/authorize.js';
import { createTask, getTasks, updateTask, deleteTask } from '../controllers/task.controller.js';

const router = Router();

// Create task (Technician only)
router.post('/', protect, authorize('technician'), createTask);

// Get tasks (Both roles)
router.get('/', protect, getTasks);

// Update task (Technician only)
router.patch('/:id', protect, authorize('technician'), updateTask);

// Delete task (Manager only)
router.delete('/:id', protect, authorize('manager'), deleteTask);

export default router;
