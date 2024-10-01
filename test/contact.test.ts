import supertest from "supertest";
import { web } from "../src/application/web";
import { ContactTest } from "./contact-util";
import { UserTest } from "./test-util";
import { logger } from "../src/application/logger";

describe("POST /api/v1/contacts", () => {
  beforeEach(async () => {
    await UserTest.create();
  });
  afterEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.delete();
  });
  it("should create new contact", async () => {
    const response = await supertest(web)
      .post("/api/v1/contacts")
      .set("X-API-TOKEN", "test")
      .send({
        first_name: "reimu",
        last_name: "hakurei",
        email: "hakurei@gmail.com",
        phone: "08816018033",
      });
    logger.debug(response.body);
    expect(response.status).toBe(201);
    expect(response.body.data.first_name).toBe("reimu");
    expect(response.body.data.last_name).toBe("hakurei");
    expect(response.body.data.email).toBe("hakurei@gmail.com");
    expect(response.body.data.phone).toBe("08816018033");
  });
  it("should create new contact when optional filled is empy", async () => {
    const response = await supertest(web)
      .post("/api/v1/contacts")
      .set("X-API-TOKEN", "test")
      .send({
        first_name: "reimu",
      });
    logger.debug(response.body);
    expect(response.status).toBe(201);
    expect(response.body.data.first_name).toBe("reimu");
    expect(response.body.data.last_name).toBe(null);
    expect(response.body.data.email).toBe(null);
    expect(response.body.data.phone).toBe(null);
  });
  it("should reject create new contact if data is invalid", async () => {
    const response = await supertest(web)
      .post("/api/v1/contacts")
      .set("X-API-TOKEN", "test")
      .send({
        first_name: "",
        last_name: "",
        email: "eko",
        phone: "0881601803311111",
      });
    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });
});

describe("GET /api/v1/contacts/:contactId", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
  });
  afterEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should be able get contact", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .get(`/api/v1/contacts/${contact.id}`)
      .set("X-API-TOKEN", "test");
    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.first_name).toBeDefined();
    expect(response.body.data.last_name).toBeDefined();
    expect(response.body.data.email).toBeDefined();
    expect(response.body.data.phone).toBeDefined();
  });
  it("should reject get contact if contact is not found", async () => {
    const response = await supertest(web)
      .get(`/api/v1/contacts/0f28136b-d083-4e64-9c52-fe3f920fbc4a`)
      .set("X-API-TOKEN", "test");
    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });
});

describe("PUT /api/v1/contact/:contactId", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
  });
  afterEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should be able to update contact", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .put(`/api/v1/contacts/${contact.id}`)
      .set("X-API-TOKEN", "test")
      .send({
        first_name: "Dian",
        last_name: "Wei",
      });
    logger.debug(response.body);

    expect(response.status).toBe(200);
    expect(response.body.data.first_name).toBe("Dian");
    expect(response.body.data.last_name).toBe("Wei");
  });
  it("should reject update contact if request invalid", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .put(`/api/v1/contacts/${contact.id}`)
      .set("X-API-TOKEN", "test")
      .send({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
      });
    logger.debug(response.body);

    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });
});

describe("DELETE /api/v1/contact/:contactId", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
  });
  afterEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should be able remove contact", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .delete(`/api/v1/contacts/${contact.id}`)
      .set("X-API-TOKEN", "test");

    expect(response.status).toBe(200);
    expect(response.body.data).toBe("OK");
  });
  it("should reject remove contact if contact not found", async () => {
    const response = await supertest(web)
      .delete(`/api/v1/contacts/0f28136b-d083-4e64-9c52-fe3f920fbc4a`)
      .set("X-API-TOKEN", "test");

    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });
});
