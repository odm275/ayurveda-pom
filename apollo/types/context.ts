import { Database } from "@/database/types";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export interface Context {
  req: NextApiRequest;
  res: NextApiResponse;
  db: Database;
  prisma: PrismaClient;
}
