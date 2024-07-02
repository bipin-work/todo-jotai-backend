import { Router } from "express";
import taskRoutes from "./task";
import authRoutes from "./auth";

const rootRouter: Router = Router();

rootRouter.use("/auth", authRoutes);
rootRouter.use("/task", taskRoutes);

export default rootRouter;
