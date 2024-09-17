import {
  type Request,
  type Response,
  type NextFunction,
  Router,
} from "express";
import { UserController } from "../controller/user-controller";

export const publicRouter = Router();

publicRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      message: "Hello from server",
    });
  }
);
publicRouter.post("/api/users", UserController.register);
