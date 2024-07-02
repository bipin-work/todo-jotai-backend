import { Request, Response } from "express";
import { prismaClient } from "..";
import { createUser, loginUser } from "../services/userService";

export const signup = async (req: Request, res: Response) => {
  const { email, password, username, name } = req.body;

  let user = await prismaClient.user.findFirst({ where: { email } });
  if (user) {
    throw Error("User already exists");
  }
  user = await createUser(req.body);
  res.json(user);
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const userAndToken = await loginUser(email, password);
  res.json(userAndToken);
};
