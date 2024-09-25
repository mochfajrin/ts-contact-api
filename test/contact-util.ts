import { prismaClient } from "../src/application/database";

export class ContactTest {
  static async deleteAll() {
    const mockUser = await prismaClient.user.findUnique({
      where: { username: "test" },
    });
    await prismaClient.contact.deleteMany({ where: { user_id: mockUser!.id } });
  }
}
