import { Response, NextFunction } from "express";
import { UserRequest } from "../types/user";
import {
  CreateAddressRequest,
  DeleteAddressRequest,
  GetAddressRequest,
  UpdateAddressRequest,
} from "../model/address-model";
import { AddressService } from "../service/address.service";

export class AddressController {
  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: CreateAddressRequest = req.body as CreateAddressRequest;
      request.contact_id = req.params.contactId;

      const response = await AddressService.create(req.user!, request);

      res.status(200).json({
        data: response,
      });
    } catch (err) {
      next(err);
    }
  }
  static async get(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: GetAddressRequest = {
        contact_id: req.params.contactId,
        id: req.params.addressId,
      };
      const response = await AddressService.get(req.user!, request);

      res.status(200).json({
        data: response,
      });
    } catch (err) {
      next(err);
    }
  }

  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: UpdateAddressRequest = req.body as UpdateAddressRequest;
      request.contact_id = req.params.contactId;
      request.id = req.params.addressId;

      const response = await AddressService.update(req.user!, request);

      res.status(200).json({
        data: response,
      });
    } catch (err) {
      next(err);
    }
  }

  static async delete(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: DeleteAddressRequest = {
        contact_id: req.params.contactId,
        id: req.params.addressId,
      };

      await AddressService.delete(req.user!, request);

      res.status(200).json({
        data: "OK",
      });
    } catch (err) {
      next(err);
    }
  }

  static async list(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const contactId = req.params.contactId;
      const response = await AddressService.list(req.user!, contactId);

      res.status(200).json({
        data: response,
      });
    } catch (err) {
      next(err);
    }
  }
}
