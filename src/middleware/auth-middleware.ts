import { Response, NextFunction } from "express";
import type { UserRequest } from "../types/user";
import { prismaClient } from "../application/database";

export const authMiddleware = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.get("X-API-TOKEN");
  if (token) {
    const user = await prismaClient.user.findFirst({ where: { token } });
    if (user) {
      req.user = user;
      return next();
    }
  }
  res
    .status(401)
    .json({
      errors: "Unauthorized",
    })
    .end();
};
