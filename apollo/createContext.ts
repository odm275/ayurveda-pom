import { NextApiRequest, NextApiResponse } from "next";
import { Database } from "@/database/types";
import { connectDatabase } from "../database";
import { connectPrismaDatabase } from "../database/prisma";
import { PrismaClient, Prisma } from "prisma";

interface Context {
  req: NextApiRequest;
  res: NextApiResponse;
  db: Database;
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation
  >;
}

export async function createContext({ req, res }): Promise<Context> {
  const db = await connectDatabase();
  const prisma = await connectPrismaDatabase();
  return { db, req, res, prisma };
}
