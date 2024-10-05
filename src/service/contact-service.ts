import { v7 as uuid } from "uuid";
import { Contact, Prisma, User } from "@prisma/client";
import {
  ContactResponse,
  CreateContactRequest,
  SearchContactRequest,
  toContactResponse,
  UpdateContactRequest,
} from "../model/contact-model";
import { ContactValidation } from "../validation/contact-validation";
import { Validation } from "../validation/validation";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { Pageable } from "../model/page-model";

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
  static async delete(user: User, contactId: string): Promise<ContactResponse> {
    await this.contactMustExist(contactId, user.id);
    const contact = await prismaClient.contact.delete({
      where: { user_id: user.id, id: contactId },
    });

    return toContactResponse(contact);
  }
  static async search(
    user: User,
    request: SearchContactRequest
  ): Promise<Pageable<ContactResponse>> {
    const searchRequest = Validation.validate(
      ContactValidation.SEARCH,
      request
    );
    const skip = (searchRequest.page - 1) * searchRequest.size;
    const filters: Array<Prisma.ContactWhereInput> = [];

    if (searchRequest.name) {
      filters.push({
        OR: [
          { first_name: { contains: searchRequest.name } },
          { last_name: { contains: searchRequest.name } },
        ],
      });
    }

    if (searchRequest.email) {
      filters.push({ email: { contains: searchRequest.email } });
    }

    if (searchRequest.phone) {
      filters.push({ phone: { contains: searchRequest.phone } });
    }

    const contacts = await prismaClient.contact.findMany({
      where: {
        user_id: user.id,
        AND: filters,
      },
      take: searchRequest.size,
      skip,
    });

    const total = await prismaClient.contact.count({
      where: { user_id: user.id, AND: filters },
    });

    return {
      data: contacts.map((contact) => toContactResponse(contact)),
      paging: {
        current_page: searchRequest.page,
        total_page: Math.ceil(total / searchRequest.size),
        size: searchRequest.size,
      },
    };
  }
}
