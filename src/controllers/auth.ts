import { NextFunction, Request, Response } from "express";
import { prismaClient } from "..";
import { createUser, loginUser } from "../services/userService";
import { BadRequestsException } from "../exceptions/bad-requests";
import { ErrorCode } from "../exceptions/root";
import { UnprocessableEntity } from "../exceptions/validation";
import { SignupSchema } from "../schema/user";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  SignupSchema.parse(req.body);
  const { email, password, username, name } = req.body;

  let user = await prismaClient.user.findFirst({ where: { email } });
  if (user) {
    throw new BadRequestsException(
      "User already exists!",
      ErrorCode.USER_ALREADY_EXISTS
    );
  }
  const takenUsername = await prismaClient.user.findFirst({
    where: { username },
  });
  if (takenUsername) {
    throw new BadRequestsException(
      "Username already taken!",
      ErrorCode.USERNAME_TAKEN
    );
  }
  user = await createUser(req.body);
  res.json(user);
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  const userAndToken = await loginUser(email, password, next);
  res.json(userAndToken);
};

export const me = async (req: Request, res: Response) => {
  res.json(req.user as any);
};
