import { NextFunction, Request, Response } from "express";
import {
  addTask,
  deleteTaskById,
  getTaskById,
  getTasks,
  updateTaskById,
} from "../services/taskService";

export const getAllTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tasks = await getTasks();
    res.json(tasks);
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
    const newTask = await addTask(req.body);
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
    const updatedTask = await updateTaskById(req.params.id, req.body);
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
    const task = await getTaskById(req.params.id);
    res.json(task);
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
    const task = await deleteTaskById(req.params.id);
    res.json(task);
  } catch (error) {
    next(error);
  }
};
