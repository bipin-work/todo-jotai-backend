import { Router } from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTask,
  updateTask,
} from "../controllers/task";
import { errorHandler } from "../error-handler";
import authMiddleware from "../middlewares/auth";

const taskRoutes: Router = Router();

taskRoutes.get("/", [authMiddleware], errorHandler(getAllTasks));
taskRoutes.post("/", [authMiddleware], errorHandler(createTask));
taskRoutes.put("/:id", [authMiddleware], errorHandler(updateTask));
taskRoutes.delete("/:id", [authMiddleware], errorHandler(deleteTask));
taskRoutes.get("/:id", [authMiddleware], errorHandler(getTask));

export default taskRoutes;
