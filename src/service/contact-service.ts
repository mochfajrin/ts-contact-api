import { v7 as uuid } from "uuid";
import { Contact, User } from "@prisma/client";
import {
  ContactResponse,
  CreateContactRequest,
  toContactResponse,
  UpdateContactRequest,
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
  static async contactMustExist(
    contactId: string,
    userId: string
  ): Promise<Contact> {
    const contact = await prismaClient.contact.findUnique({
      where: { id: contactId, user_id: userId },
    });
    if (!contact) {
      throw new ResponseError(404, "Contact not found");
    }
    return contact;
  }
  static async get(user: User, id: string): Promise<ContactResponse> {
    const contact = await this.contactMustExist(id, user.id);
    return toContactResponse(contact);
  }
  static async update(
    user: User,
    request: UpdateContactRequest
  ): Promise<ContactResponse> {
    const updateRequest = Validation.validate(
      ContactValidation.UPDATE,
      request
    );
    await this.contactMustExist(updateRequest.id, user.id);

    const contact = await prismaClient.contact.update({
      where: { user_id: user.id, id: updateRequest.id },
      data: updateRequest,
    });

    return toContactResponse(contact);
  }
}
