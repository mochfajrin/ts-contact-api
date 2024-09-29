import { prismaClient } from "./src/application/database";

async function run() {
  const contact = await prismaClient.contact.findUnique({
    where: {
      user_id: "0f28136b-d083-4e64-9c52-fe3f920fbc4a",
      id: "0f28136b-d083-4e64-9c52-fe3f920fbc4a",
    },
  });

  console.log(contact);
}
run();
