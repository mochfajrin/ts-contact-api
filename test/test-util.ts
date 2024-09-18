import { prismaClient } from "../src/application/database";

export class UserTest {
  static async delete(username?: string) {
    await prismaClient.user.deleteMany({
      where: { username: username || "test" },
    });
  }
}
