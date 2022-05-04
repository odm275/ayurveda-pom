import { NextApiRequest, NextApiResponse } from "next";
import Cryptr from "cryptr";
import { Database } from "@/database/types";
import { User } from "@prisma/client";
import { clearCookie } from "@/apollo/utils/cookies-helper";

interface logInViaCookieTypes {
  token: string;
  req: NextApiRequest;
  res: NextApiResponse;
  prisma: any;
}

export const logInViaCookie = async ({
  token,
  req,
  res,
  prisma
}: logInViaCookieTypes) => {
  // grab viewer cookie
  // Decrypt it to its userID
  // Look for userID in the db that matches decrypted ID.

  const viewerCookie = req.cookies.viewer;
  const cryptr = new Cryptr(process.env.SECRET);
  const decryptedUserId = viewerCookie ? cryptr.decrypt(viewerCookie) : null;
  const viewer = await prisma.user.update({
    where: {
      id: decryptedUserId
    },
    data: {
      token
    }
    // include: {
    //   tasks: true
    // }
  });

  if (!viewer) {
    clearCookie(res, "viewer");
  }
  return viewer;
};
