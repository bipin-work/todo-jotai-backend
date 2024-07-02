import { Request, Response, NextFunction } from "express";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { ErrorCode } from "../exceptions/root";
import { JWT_SECRET } from "../../secret";
import * as jwt from "jsonwebtoken";
import { prismaClient } from "..";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  if (!token) {
    next(new UnauthorizedException("Unauthorized!", ErrorCode.UNAUTHORIZED));
    return;
  }

  try {
    const payload: { userId: string } = jwt.verify(token, JWT_SECRET) as any;
    const user = await prismaClient.user.findFirst({
      where: { id: payload.userId },
    });

    if (!user) {
      next(new UnauthorizedException("Unauthorized!", ErrorCode.UNAUTHORIZED));
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    next(new UnauthorizedException("Unauthorized!", ErrorCode.UNAUTHORIZED));
  }
};

export default authMiddleware;
