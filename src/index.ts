import express, { Express, Request, Response } from "express";
import rootRouter from "./routes";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import errorHandler from "./middlewares/errorHandler";
import { errorMiddleware } from "./middlewares/error";
import { SignupSchema } from "./schema/user";

const app: Express = express();
app.use(express.json());
const corsOptions = {
  origin: "http://localhost:3001",
  methods: "*",
  credentials: false,
};
app.use(cors(corsOptions));

app.use("/api", rootRouter);

export const prismaClient = new PrismaClient({
  log: ["query"],
});

app.use(errorMiddleware);

app.listen(3000, () => {
  console.log("App working!");
});
