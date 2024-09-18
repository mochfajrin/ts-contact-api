import supertest from "supertest";
import { server, web } from "../src/application/web";
import { logger } from "../src/application/logger";
import { UserTest } from "./test-util";

describe("POST /api/users", () => {
  afterEach(async () => {
    await UserTest.delete();
  });
  afterAll(() => {
    server.close();
  });
  it("should reject register new user if request is invalid", async () => {
    const response = await supertest(web).post("/api/users").send({
      username: "",
      password: "",
      name: "",
    });
    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });
  it("should register new user if request valid", async () => {
    const response = await supertest(web).post("/api/users").send({
      username: "test",
      password: "test",
      name: "test",
    });
    logger.debug(response.body);
    expect(response.status).toBe(201);
    expect(response.body.data.username).toBe("test");
    expect(response.body.data.name).toBe("test");
  });
});
