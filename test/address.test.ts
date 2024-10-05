import supertest from "supertest";
import { ContactTest } from "./contact-util";
import { UserTest, AddressTest } from "./test-util";
import { web } from "../src/application/web";
import { logger } from "../src/application/logger";

describe("POST /api/v1/contacts/:contactId/addresses", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
  });
  afterEach(async () => {
    await AddressTest.deleteAll();
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should be able to create address", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .post(`/api/v1/contacts/${contact.id}/addresses`)
      .set("X-API-TOKEN", "test")
      .send({
        postal_code: "123456",
        street: "Tengiri",
        city: "Lamongan",
        province: "East Java",
        country: "Indonesia",
      });

    logger.debug(response.body);

    expect(response.status).toBe(200);
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.postal_code).toBe("123456");
    expect(response.body.data.street).toBe("Tengiri");
    expect(response.body.data.city).toBe("Lamongan");
    expect(response.body.data.province).toBe("East Java");
    expect(response.body.data.country).toBe("Indonesia");
  });
  it("should reject create address if request invalid", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .post(`/api/v1/contacts/${contact.id}/addresses`)
      .set("X-API-TOKEN", "test")
      .send({
        postal_code: "123456",
        street: "Tengiri",
        city: "Lamongan",
        province: "East Java",
        country: "",
      });

    logger.debug(response.body);

    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });
  it("should reject create address if contact not found", async () => {
    const response = await supertest(web)
      .post(`/api/v1/contacts/0f28136b-d083-4e64-9c52-fe3f920fbc4a/addresses`)
      .set("X-API-TOKEN", "test")
      .send({
        postal_code: "123456",
        street: "Tengiri",
        city: "Lamongan",
        province: "East Java",
        country: "Indonesia",
      });

    logger.debug(response.body);

    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });
});

describe("GET /api/v1/contacts/:contactId/addresses/:addressId", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
    await AddressTest.create();
  });
  afterEach(async () => {
    await AddressTest.deleteAll();
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should reject ", async () => {
    const contact = await ContactTest.get();
    const address = await AddressTest.get();

    const response = await supertest(web)
      .get(`/api/v1/contacts/${contact.id}/addresses/${address!.id}`)
      .set("X-API-TOKEN", "test");
    logger.debug(response.body);

    expect(response.status).toBe(200);
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.postal_code).toBe(address?.postal_code);
    expect(response.body.data.street).toBe(address?.street);
    expect(response.body.data.city).toBe(address?.city);
    expect(response.body.data.province).toBe(address?.province);
    expect(response.body.data.country).toBe(address?.country);
  });

  it("should reject if address is not found", async () => {
    const contact = await ContactTest.get();

    const response = await supertest(web)
      .get(
        `/api/v1/contacts/${contact.id}/addresses/0f28136b-d083-4e64-9c52-fe3f920fbc4a`
      )
      .set("X-API-TOKEN", "test");
    logger.debug(response.body);

    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });
  it("should reject if contact is not found", async () => {
    const address = await AddressTest.get();

    const response = await supertest(web)
      .get(
        `/api/v1/contacts/0f28136b-d083-4e64-9c52-fe3f920fbc4a/addresses/${address?.id}`
      )
      .set("X-API-TOKEN", "test");
    logger.debug(response.body);

    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });
});
