import { Contact } from "@prisma/client";
import { v7 as uuid } from "uuid";
import { prismaClient } from "../src/application/database";

export class ContactTest {
  static async deleteAll() {
    const mockUser = await prismaClient.user.findUnique({
      where: { username: "test" },
    });
    await prismaClient.contact.deleteMany({ where: { user_id: mockUser!.id } });
  }
  static async create() {
    const mockUser = await prismaClient.user.findUnique({
      where: { username: "test" },
    });

    await prismaClient.contact.createMany({
      data: [
        {
          id: uuid(),
          user_id: mockUser!.id,
          first_name: "youmu",
          last_name: "saigyouji",
          phone: "0881",
          email: "youmu@example.com",
        },
        {
          id: uuid(),
          user_id: mockUser!.id,
          first_name: "yuyuko",
        },
      ],
    });
  }
  static async get(): Promise<Contact> {
    const mockUser = await prismaClient.user.findUnique({
      where: { username: "test" },
    });
    const contact = await prismaClient.contact.findFirst({
      where: { user_id: mockUser!.id },
    });
    if (!contact) {
      throw new Error("contact not found");
    }
    return contact;
  }
}
