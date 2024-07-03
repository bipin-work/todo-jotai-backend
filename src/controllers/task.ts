import { NextFunction, Request, Response } from "express";
import {
  addTask,
  deleteTaskById,
  getTaskById,
  getTasks,
  updateTaskById,
} from "../services/taskService";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";

export const getAllTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    const tasks = await getTasks(user.id);
    res.json(tasks || []);
  } catch (error) {
    next(error);
  }
};

export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    const newTask = await addTask(user.id, req.body);
    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};
export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    const updatedTask = await updateTaskById(user.id, req.params.id, req.body);
    res.json(updatedTask);
  } catch (error) {
    next(error);
  }
};
export const getTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    const task = await getTaskById(user.id, req.params.id);
    if (!task) {
      throw new NotFoundException("Task not found!", ErrorCode.TASK_NOT_FOUND);
    }
    res.json(task || []);
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    const task = await deleteTaskById(user.id, req.params.id);
    res.json(task);
  } catch (error) {
    next(error);
  }
};
