import { v7 as uuid } from "uuid";
import { User } from "@prisma/client";
import {
  ContactResponse,
  CreateContactRequest,
  toContactResponse,
} from "../model/contact-model";
import { ContactValidation } from "../validation/contact-validation";
import { Validation } from "../validation/validation";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";

export class ContactService {
  static async create(
    user: User,
    request: CreateContactRequest
  ): Promise<ContactResponse> {
    const createRequest = Validation.validate(
      ContactValidation.CREATE,
      request
    );
    const contact = await prismaClient.contact.create({
      data: {
        id: uuid(),
        user_id: user.id,
        ...createRequest,
      },
    });
    return toContactResponse(contact);
  }
  static async get(user: User, id: string): Promise<ContactResponse> {
    const contact = await prismaClient.contact.findUnique({
      where: { id, user_id: user.id },
    });
    console.log(contact);
    if (!contact) {
      throw new ResponseError(404, "Contact not found");
    }
    return toContactResponse(contact);
  }
}
