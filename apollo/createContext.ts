import { NextApiRequest, NextApiResponse } from "next";
import { Database } from "@/database/types";
import { connectDatabase } from "../database";

interface Context {
  req: NextApiRequest;
  res: NextApiResponse;
  db: Database;
}

export async function createContext({ req, res }): Promise<Context> {
  const db = await connectDatabase();
  return { db, req, res };
}
