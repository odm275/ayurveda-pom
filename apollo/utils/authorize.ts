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
  console.log(process.env.NODE_ENV);

  const token = req.headers?.["x-csrf-token"] as string | null;

  const viewerCookie = req.cookies.viewer;
  const cryptr = new Cryptr(process.env.SECRET);
  const decryptedUserId = viewerCookie ? cryptr.decrypt(viewerCookie) : null;

  const whereObj =
    process.env.NODE_ENV === "development"
      ? {
          id: "102370478380724182316"
        }
      : {
          id: decryptedUserId,
          token
        };

  const viewer = await prisma.user.findFirst({
    where: whereObj,
    include: {
      tasks: includeTasks
    }
  });

  return viewer;
};
