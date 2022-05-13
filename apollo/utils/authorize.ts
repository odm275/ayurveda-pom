import { NextApiRequest } from "next";
import { PrismaClient } from "@prisma/client";
import { User } from "@prisma/client";
import Cryptr from "cryptr";

interface Params {
  db?: any;
  prisma?: PrismaClient;
  req: NextApiRequest;
  includeTasks?: boolean;
}

export const authorize = async ({
  db,
  prisma,
  req,
  includeTasks = false
}: Params): Promise<User | null> => {
  const token = req.headers["x-csrf-token"] as string;

  const viewerCookie = req.cookies.viewer;
  const cryptr = new Cryptr(process.env.SECRET);
  const decryptedUserId = viewerCookie ? cryptr.decrypt(viewerCookie) : null;

  const viewer = await prisma.user.findFirst({
    where: {
      id: decryptedUserId,
      token: token
    },
    include: {
      tasks: includeTasks
    }
  });

  return viewer;
};
