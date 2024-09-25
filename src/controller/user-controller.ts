import { NextFunction, Request, Response } from "express";
import {
  CreateUserRequest,
  UserLoginRequest,
  UserUpdateRequest,
} from "../model/user-model";
import { UserService } from "../service/user-service";
import { UserRequest } from "../types/user";

export class UserController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateUserRequest = req.body as CreateUserRequest;
      const response = await UserService.register(request);

      res.status(201).json({
        data: response,
      });
    } catch (err) {
      next(err);
    }
  }
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const request: UserLoginRequest = req.body as UserLoginRequest;
      const response = await UserService.login(request);

      res.status(200).json({
        data: response,
      });
    } catch (err) {
      next(err);
    }
  }
  static async get(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const response = await UserService.get(req.user!);
      res.status(200).json({
        data: response,
      });
    } catch (err) {
      next(err);
    }
  }
  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const reqBody = req.body as UserUpdateRequest;
      const response = await UserService.update(req.user!, reqBody);
      res.status(200).json({
        data: response,
      });
    } catch (err) {
      next(err);
    }
  }
  static async logout(req: UserRequest, res: Response, next: NextFunction) {
    try {
      await UserService.logout(req.user!);
      res.status(200).json({
        data: "OK",
      });
    } catch (err) {
      next(err);
    }
  }
}
