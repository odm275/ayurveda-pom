import { NextApiRequest, NextApiResponse } from "next";
import Cryptr from "cryptr";
import { Database, User } from "@/database/types";
import { clearCookie } from "@/apollo/utils/cookies-helper";

export const logInViaCookie = async (
  token: string,
  db: Database,
  req: NextApiRequest,
  res: NextApiResponse
): Promise<User | undefined> => {
  // grab viewer cookie
  // Decrypt it to its userID
  // Look for userID in the db that matches decrypted ID.

  const viewerCookie = req.cookies.viewer;
  const cryptr = new Cryptr(process.env.SECRET);
  const decryptedUserId = viewerCookie ? cryptr.decrypt(viewerCookie) : null;
  const updateRes = await db.users.findOneAndUpdate(
    { _id: decryptedUserId },
    { $set: { token } },
    { returnOriginal: false }
  );

  const viewer = updateRes.value;
  if (!viewer) {
    clearCookie(res, "viewer");
  }
  return viewer;
};
