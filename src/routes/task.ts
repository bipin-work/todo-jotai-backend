import { Router } from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTask,
  updateTask,
} from "../controllers/task";

const taskRoutes: Router = Router();

taskRoutes.get("/", getAllTasks);
taskRoutes.post("/", createTask);
taskRoutes.put("/:id", updateTask);
taskRoutes.delete("/:id", deleteTask);
taskRoutes.get("/:id", getTask);

export default taskRoutes;
