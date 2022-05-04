import { Database } from "@/database/types";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { connectDatabase } from "../database";
import { connectPrismaDatabase } from "../database/prisma";

interface Params {
  req: NextApiRequest;
  res: NextApiResponse;
}

export interface Context {
  req: NextApiRequest;
  res: NextApiResponse;
  db: Database;
  prisma: PrismaClient;
}

export async function createContext({ req, res }: Params): Promise<Context> {
  const db = await connectDatabase();
  const prisma = connectPrismaDatabase();
  const value = { db, req, res, prisma };

  return value;
}
