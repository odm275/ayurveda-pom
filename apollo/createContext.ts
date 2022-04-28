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

interface Params {
  req: NextApiRequest;
  res: NextApiResponse;
}

export async function createContext({ req, res }: Params): Promise<Context> {
  const db = await connectDatabase();
  const prisma = connectPrismaDatabase();
  const value = { db, req, res, prisma };

  return value;
}
