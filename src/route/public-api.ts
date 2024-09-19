import { Router } from "express";
import { UserController } from "../controller/user-controller";

export const publicRouter = Router();

publicRouter.post("/api/v1/users", UserController.register);
publicRouter.post("/api/v1/users/login", UserController.login);
