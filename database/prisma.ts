import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

export const connectPrismaDatabase = async () => {
  return prismaClient;
};
