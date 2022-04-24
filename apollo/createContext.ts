import { NextApiRequest, NextApiResponse } from "next";
import { Database } from "@/database/types";
import { connectDatabase } from "../database";
import { connectPrismaDatabase } from "../database/prisma";
import { PrismaClient } from "prisma";

export interface Context {
  req: NextApiRequest;
  res: NextApiResponse;
  db: Database;
  prisma: PrismaClient;
}

export async function createContext({
  req,
  res
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}): Promise<Context> {
  const db = await connectDatabase();
  const prisma = connectPrismaDatabase();
  return { db, req, res, prisma };
}
