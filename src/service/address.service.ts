import { Address, User } from "@prisma/client";
import {
  AddressResponse,
  CreateAddressRequest,
  DeleteAddressRequest,
  GetAddressRequest,
  toAddressResponse,
  UpdateAddressRequest,
} from "../model/address-model";
import { Validation } from "../validation/validation";
import { AddressValidation } from "../validation/address-validation";
import { ContactService } from "../service/contact-service";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";

export class AddressService {
  static async create(user: User, request: CreateAddressRequest): Promise<AddressResponse> {
    const createRequest = Validation.validate(AddressValidation.CREATE, request);
    await ContactService.contactMustExist(createRequest.contact_id, user.id);

    const address = await prismaClient.address.create({ data: createRequest });

    return toAddressResponse(address);
  }
  static async addressMustExist(addressId: string, contactId: string): Promise<Address> {
    const address = await prismaClient.address.findUnique({
      where: { id: addressId, contact_id: contactId },
    });
    if (!address) {
      throw new ResponseError(404, "Address is not found");
    }
    return address;
  }
  static async get(user: User, request: GetAddressRequest): Promise<AddressResponse> {
    const requestAddress = Validation.validate(AddressValidation.GET, request);

    await ContactService.contactMustExist(requestAddress.contact_id, user.id);
    const address = await this.addressMustExist(requestAddress.id, requestAddress.contact_id);

    return toAddressResponse(address);
  }

  static async update(user: User, request: UpdateAddressRequest): Promise<AddressResponse> {
    const requestAddress = Validation.validate(AddressValidation.UPDATE, request);

    await ContactService.contactMustExist(requestAddress.contact_id, user.id);
    await this.addressMustExist(requestAddress.id, requestAddress.contact_id);

    const address = await prismaClient.address.update({
      data: requestAddress,
      where: { id: requestAddress.id, contact_id: requestAddress.contact_id },
    });

    return toAddressResponse(address);
  }
  static async delete(user: User, request: DeleteAddressRequest): Promise<AddressResponse> {
    const addressRequest = Validation.validate(AddressValidation.DELETE, request);
    await ContactService.contactMustExist(request.contact_id, user.id);
    await this.addressMustExist(request.id, request.contact_id);

    const address = await prismaClient.address.delete({
      where: { id: addressRequest.id, contact_id: addressRequest.contact_id },
    });
    return toAddressResponse(address);
  }
  static async list(user: User, contactId: string): Promise<Array<AddressResponse>> {
    await ContactService.contactMustExist(contactId, user.id);

    const addresses = await prismaClient.address.findMany({ where: { contact_id: contactId } });

    return addresses.map((address) => toAddressResponse(address));
  }
}
