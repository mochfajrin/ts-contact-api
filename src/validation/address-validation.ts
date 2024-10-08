import { z, ZodType } from "zod";

export class AddressValidation {
  static readonly CREATE: ZodType = z.object({
    contact_id: z.string().min(1).max(100),
    street: z.string().min(1).max(100).optional(),
    postal_code: z.string().min(1).max(100).optional(),
    city: z.string().min(1).max(100).optional(),
    province: z.string().min(1).max(100).optional(),
    country: z.string().min(1).max(100),
  });
  static readonly GET: ZodType = z.object({
    contact_id: z.string().min(1).max(100),
    id: z.string().min(1).max(100),
  });
  static readonly DELETE: ZodType = z.object({
    contact_id: z.string().min(1).max(100),
    id: z.string().min(1).max(100),
  });
  static readonly UPDATE: ZodType = z.object({
    id: z.string().min(1).max(100),
    contact_id: z.string().min(1).max(100),
    street: z.string().min(1).max(100).optional(),
    postal_code: z.string().min(1).max(100).optional(),
    city: z.string().min(1).max(100).optional(),
    province: z.string().min(1).max(100).optional(),
    country: z.string().min(1).max(100),
  });
}
