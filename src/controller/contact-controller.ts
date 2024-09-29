import { Request, Response, NextFunction } from "express";
import { CreateContactRequest } from "../model/contact-model";
import { UserRequest } from "../types/user";
import { ContactService } from "../service/contact-service";

export class ContactController {
  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: CreateContactRequest = req.body as CreateContactRequest;
      const response = await ContactService.create(req.user!, request);
      res.status(201).json({
        data: response,
      });
    } catch (err) {
      next(err);
    }
  }
  static async get(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const contactId = req.params.contactId;
      const response = await ContactService.get(req.user!, contactId);
      res.status(200).json({
        data: response,
      });
    } catch (err) {
      next(err);
    }
  }
}
