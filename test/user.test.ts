import supertest from "supertest";
import { web } from "../src/application/web";
import { logger } from "../src/application/logger";
import { UserTest } from "./test-util";
import { Bcrypt } from "../src/lib/bcrypt";

describe("POST /api/v1/users", () => {
  afterEach(async () => {
    await UserTest.delete();
  });

  it("should reject register new user if request is invalid", async () => {
    const response = await supertest(web).post("/api/v1/users").send({
      username: "",
      password: "",
      name: "",
    });
    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });
  it("should register new user if request valid", async () => {
    const response = await supertest(web).post("/api/v1/users").send({
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

describe("POST /api/v1/users/login", () => {
  beforeEach(async () => {
    await UserTest.create();
  });
  afterEach(async () => {
    await UserTest.delete();
  });

  it("should be able to login", async () => {
    const response = await supertest(web)
      .post("/api/v1/users/login")
      .send({ username: "test", password: "test" });
    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.username).toBe("test");
    expect(response.body.data.name).toBe("test");
    expect(response.body.data.token).toBeDefined();
  });
  it("should reject login user if username is wrong", async () => {
    const response = await supertest(web)
      .post("/api/v1/users/login")
      .send({ username: "foo", password: "bar" });
    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });
});

describe("GET /api/v1/users/current", () => {
  beforeEach(async () => {
    await UserTest.create();
  });
  afterEach(async () => {
    await UserTest.delete();
  });
  it("should be able to get user", async () => {
    const response = await supertest(web)
      .get("/api/v1/users/current")
      .set("X-API-TOKEN", "test");
    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.username).toBe("test");
    expect(response.body.data.name).toBe("test");
  });
  it("should reject get user if token invalid", async () => {
    const response = await supertest(web)
      .get("/api/v1/users/current")
      .set("X-API-TOKEN", "wrong");
    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });
});

describe("PATCH /api/v1/users/current", () => {
  beforeEach(async () => {
    await UserTest.create();
  });
  afterEach(async () => {
    await UserTest.delete();
  });
  it("should reject update user if request is invalid", async () => {
    const response = await supertest(web)
      .patch("/api/v1/users/current")
      .set("X-API-TOKEN", "test")
      .send({
        username: "",
        password: "",
      });
    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });
  it("should reject update user if token is wrong", async () => {
    const response = await supertest(web)
      .patch("/api/v1/users/current")
      .set("X-API-TOKEN", "")
      .send({
        username: "test1",
        password: "test1",
      });
    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });
  it("should update user", async () => {
    const response = await supertest(web)
      .patch("/api/v1/users/current")
      .set("X-API-TOKEN", "test")
      .send({
        name: "test",
        password: "test1",
      });
    logger.debug(response.body);
    const user = await UserTest.get();

    expect(response.status).toBe(200);
    expect(response.body.data.name).toBe("test");
    expect(await Bcrypt.compare("test1", user.password)).toBe(true);
  });
});

describe("DELETE /api/v1/users/logout", () => {
  beforeEach(async () => {
    await UserTest.create();
  });
  afterEach(async () => {
    await UserTest.delete();
  });
  it("should be able to logout", async () => {
    const response = await supertest(web)
      .delete("/api/v1/users/logout")
      .set("X-API-TOKEN", "test");
    logger.debug(response.body);

    expect(response.status).toBe(200);
    expect(response.body.data).toBe("OK");

    const user = await UserTest.get();
    expect(user.token).toBe(null);
  });
  it("should reject logout user if token is wrong", async () => {
    const response = await supertest(web)
      .delete("/api/v1/users/logout")
      .set("X-API-TOKEN", "test1");
    logger.debug(response.body);

    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });
});
