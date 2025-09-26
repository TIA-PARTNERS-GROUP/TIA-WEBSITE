import db from "../config/db.js";
import tasksModel from '../models/tasks.js';

// Get all tasks
export const getAllTasks = async (req, res, next) => {
  try {
    const tasks = tasksModel(db);
    const allTasks = await tasks.getAllTasks();
    res.json(allTasks);
  } catch (error) {
    next(error);
  }
};

    // Get a single task by ID
export const getTaskById = async (req, res, next) => {
  try {
    const tasks = tasksModel(db);
    const task = await tasks.getTaskById(req.params.taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    next(error);
  }
};

    // Get tasks for a specific user
export const getUserTasks = async (req, res, next) => {
  try {
    const tasks = tasksModel(db);
    const userTasks = await tasks.getUserTasks(req.params.userId);
    res.json(userTasks);
  } catch (error) {
    next(error);
  }
};

    // Get user's progress for a specific task on a date
export const getTaskProgress = async (req, res, next) => {
  try {
    const { userId, taskId, date } = req.params;
    const tasks = tasksModel(db);
    
    // Validate date format
    if (!date.match(/^\d{4}-\d{2}-\d{2}$/)) {
      return res.status(400).json({ message: 'Invalid date format. Use YYYY-MM-DD' });
    }

    // Check if task exists and user is enrolled
    const task = await tasks.getTaskById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const isEnrolled = await tasks.isUserEnrolled(userId, taskId);
    if (!isEnrolled) {
      return res.status(403).json({ message: 'User is not enrolled in this task' });
    }

    const progress = await tasks.getUserTaskProgress(userId, taskId, date);
    res.json({ progress });
  } catch (error) {
    next(error);
  }
};

    // Get user's progress for all tasks on a date
export const getDailyProgress = async (req, res, next) => {
  try {
    const { userId, date } = req.params;
    const tasks = tasksModel(db);

    // Validate date format
    if (!date.match(/^\d{4}-\d{2}-\d{2}$/)) {
      return res.status(400).json({ message: 'Invalid date format. Use YYYY-MM-DD' });
    }

    const progress = await tasks.getUserDailyProgress(userId, date);
    res.json(progress);
  } catch (error) {
    next(error);
  }
};

    // Update user's progress for a task
export const updateTaskProgress = async (req, res, next) => {
  try {
    const { userId, taskId, date } = req.params;
    const { progress } = req.body;
    const tasks = tasksModel(db);

    // Validate progress
    if (typeof progress !== 'number' || progress < 0 || progress > 100) {
      return res.status(400).json({ message: 'Progress must be a number between 0 and 100' });
    }

    // Validate date format
    if (!date.match(/^\d{4}-\d{2}-\d{2}$/)) {
      return res.status(400).json({ message: 'Invalid date format. Use YYYY-MM-DD' });
    }

    // Check if task exists and user is enrolled
    const task = await tasks.getTaskById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const isEnrolled = await tasks.isUserEnrolled(userId, taskId);
    if (!isEnrolled) {
      return res.status(403).json({ message: 'User is not enrolled in this task' });
    }

    await tasks.updateUserTaskProgress(userId, taskId, date, progress);
    res.json({ message: 'Progress updated successfully' });
  } catch (error) {
    next(error);
  }
};

    // Enroll user in a task
export const enrollUserInTask = async (req, res, next) => {
  try {
    const { userId, taskId } = req.params;
    const tasks = tasksModel(db);
    
    // Check if task exists
    const task = await tasks.getTaskById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check if already enrolled
    const isEnrolled = await tasks.isUserEnrolled(userId, taskId);
    if (isEnrolled) {
      return res.status(400).json({ message: 'User is already enrolled in this task' });
    }

    await tasks.enrollUserInTask(userId, taskId);
    res.status(201).json({ message: 'Successfully enrolled in task' });
  } catch (error) {
    next(error);
  }
};

    // Unenroll user from a task
export const unenrollUserFromTask = async (req, res, next) => {
  try {
    const { userId, taskId } = req.params;
    const tasks = tasksModel(db);
    
    // Check if enrolled
    const isEnrolled = await tasks.isUserEnrolled(userId, taskId);
    if (!isEnrolled) {
      return res.status(400).json({ message: 'User is not enrolled in this task' });
    }

    await tasks.unenrollUserFromTask(userId, taskId);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};