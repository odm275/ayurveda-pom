import { NextApiRequest } from "next";
import { PrismaClient } from "@prisma/client";
import { User } from "@prisma/client";
import Cryptr from "cryptr";

export const authorize = async (
  prisma: PrismaClient,
  req: NextApiRequest
): Promise<User | null> => {
  const token = req.headers["x-csrf-token"] as string;

  const viewerCookie = req.cookies.viewer;
  const cryptr = new Cryptr(process.env.SECRET);
  const decryptedUserId = viewerCookie ? cryptr.decrypt(viewerCookie) : null;

  const viewer = await prisma.user.findFirst({
    where: {
      id: decryptedUserId,
      token: token
    }
  });

  return viewer;
};
