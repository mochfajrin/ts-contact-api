import { PrismaClient } from "@prisma/client";
import { logger } from "./logger";

export const prismaClient = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
    {
      emit: "event",
      level: "error",
    },
    {
      emit: "event",
      level: "info",
    },
    {
      emit: "event",
      level: "warn",
    },
  ],
});

prismaClient.$on("error", (err) => {
  logger.error(err);
});
prismaClient.$on("query", (query) => {
  logger.info(query);
});
prismaClient.$on("info", (info) => {
  logger.info(info);
});
prismaClient.$on("warn", (warn) => {
  logger.warn(warn);
});
