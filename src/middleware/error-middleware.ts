import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { ResponseError } from "../error/response-error";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const errorMiddleware = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof ZodError) {
    res.status(400).json({
      errors: `Validation Error ${JSON.stringify(err)}`,
    });
  } else if (err instanceof PrismaClientKnownRequestError) {
    res.status(400).json({
      errors: `Invalid Request Error ${JSON.stringify(err)}`,
    });
  } else if (err instanceof ResponseError) {
    res.status(err.status).json({
      errors: err.message,
    });
  } else {
    res.status(500).json({
      errors: err.message,
    });
  }
};
