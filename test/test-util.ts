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
  static async delete(username?: string) {
    await prismaClient.user.deleteMany({
      where: { username: username || "test" },
    });
  }
}
