import { PrismaClient, User } from "@prisma/client";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../secret";
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

export const loginUser = async (email: string, password: string) => {
  let user = await prisma.user.findFirst({ where: { email } });
  if (!user) {
    throw Error("User does not exists");
  }
  if (!compareSync(password, user.password)) {
    throw Error("Password incorrect");
  }

  const token = jwt.sign(
    {
      userId: user.id,
    },
    JWT_SECRET
  );

  return { user, token };
};
