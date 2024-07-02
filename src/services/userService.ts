import { PrismaClient, User } from "@prisma/client";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../secret";
import { NextFunction } from "express";
import { BadRequestsException } from "../exceptions/bad-requests";
import { ErrorCode } from "../exceptions/root";
import { NotFoundException } from "../exceptions/not-found";
const prisma = new PrismaClient();

export const getUsers = async (): Promise<User[]> => {
  return prisma.user.findMany();
};

export const createUser = async ({ name, email, username, password }: User) => {
  return prisma.user.create({
    data: {
      name,
      email,
      username,
      password: hashSync(password, 10),
    },
  });
};

export const loginUser = async (
  email: string,
  password: string,
  next: NextFunction
) => {
  let user = await prisma.user.findFirst({ where: { email } });
  if (!user) {
    throw new NotFoundException("User not found!", ErrorCode.USER_NOT_FOUND);
  }
  if (!compareSync(password, user.password)) {
    throw new BadRequestsException(
      "Password is incorrect!",
      ErrorCode.INCORRECT_PASSWORD
    );
  }

  const token = jwt.sign(
    {
      userId: user.id,
    },
    JWT_SECRET
  );

  return { user, token };
};
