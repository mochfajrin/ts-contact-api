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
}
