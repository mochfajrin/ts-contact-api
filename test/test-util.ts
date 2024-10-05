import { User } from "@prisma/client";
import { prismaClient } from "../src/application/database";
import { Bcrypt } from "../src/lib/bcrypt";
import { ContactTest } from "./contact-util";

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

export class AddressTest {
  static async deleteAll() {
    const contact = await ContactTest.get();
    await prismaClient.address.deleteMany({
      where: { contact_id: contact!.id },
    });
  }
  static async create() {
    const contact = await ContactTest.get();
    await prismaClient.address.create({
      data: {
        contact_id: contact!.id,
        postal_code: "123456",
        street: "Tengiri",
        city: "Lamongan",
        province: "East Java",
        country: "Indonesia",
      },
    });
  }
  static async get() {
    const user = await UserTest.get();
    const address = await prismaClient.address.findFirst({
      where: { contact: { user_id: user!.id } },
    });
    return address;
  }
}
