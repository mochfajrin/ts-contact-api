import { User } from "@prisma/client";
import { prismaClient } from "../src/application/database";
import { Bcrypt } from "../src/lib/bcrypt";

export class UserTest {
  static async create() {
    await prismaClient.user.create({
      data: {
        name: "test",
        username: "test",
        password: await Bcrypt.hash("test"),
        token: "test",
      },
    });
  }
  static async delete() {
    await prismaClient.user.deleteMany({
      where: { username: "test" },
    });
  }
  static async get(): Promise<User> {
    const user = await prismaClient.user.findFirst({
      where: { username: "test" },
    });
    if (!user) throw new Error("User is not found");
    return user!;
  }
}
