import { Address } from "@prisma/client";

export type AddressResponse = {
  id: string;
  street?: string | null;
  postal_code: string | null;
  city?: string | null;
  province?: string | null;
  country: string;
};

export type GetAddressRequest = {
  contact_id: string;
  id: string;
};

export type DeleteAddressRequest = GetAddressRequest;

export type CreateAddressRequest = {
  contact_id: string;
  street?: string | null;
  postal_code: string | null;
  city?: string | null;
  province?: string | null;
  country: string;
};

export type UpdateAddressRequest = { id: string } & CreateAddressRequest;

export function toAddressResponse(address: Address): AddressResponse {
  return {
    id: address.id,
    street: address.street,
    postal_code: address.postal_code,
    city: address.city,
    province: address.province,
    country: address.country,
  };
}
