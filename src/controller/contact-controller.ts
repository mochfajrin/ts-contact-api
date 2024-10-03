import { Request, Response, NextFunction } from "express";
import {
  CreateContactRequest,
  SearchContactRequest,
  UpdateContactRequest,
} from "../model/contact-model";
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
  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request = req.body as UpdateContactRequest;
      request.id = req.params.contactId;
      const response = await ContactService.update(req.user!, request);

      res.status(200).json({
        data: response,
      });
    } catch (err) {
      next(err);
    }
  }
  static async delete(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const contactId = req.params.contactId;
      await ContactService.delete(req.user!, contactId);

      res.status(200).json({
        data: "OK",
      });
    } catch (err) {
      next(err);
    }
  }
  static async search(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: SearchContactRequest = {
        name: req.query.name as string,
        email: req.query.email as string,
        phone: req.query.phone as string,
        page: req.query.page ? Number(req.query.page) : 1,
        size: req.query.size ? Number(req.query.size) : 10,
      };

      const response = await ContactService.search(req.user!, request);
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }
}
