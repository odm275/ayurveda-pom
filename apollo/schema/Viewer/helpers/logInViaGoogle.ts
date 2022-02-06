import { NextApiResponse } from "next";
import Cryptr from "cryptr";
import { Database, User, PomCycle } from "@/database/types";
import { setCookie } from "@/apollo/utils/cookies-helper";
import { Google } from "../../../api/Google";

const cookieOptions = {
  httpOnly: true,
  sameSite: true,
  signed: true,
  secure: process.env.NODE_ENV === "development" ? false : true
};

export const logInViaGoogle = async (
  code: string,
  token: string,
  db: Database,
  res: NextApiResponse
): Promise<User | undefined> => {
  const { user } = await Google.logIn(code);

  if (!user) {
    throw new Error("Google login error");
  }

  // Names/Photos/Email Lists
  const userNamesList = user.names && user.names.length ? user.names : null;
  const userPhotosList = user.photos && user.photos.length ? user.photos : null;
  const userEmailsList =
    user.emailAddresses && user.emailAddresses.length
      ? user.emailAddresses
      : null;

  // User Display Name
  const userName = userNamesList ? userNamesList[0].displayName : null;

  // User Id
  const userId =
    userNamesList &&
    userNamesList[0].metadata &&
    userNamesList[0].metadata.source
      ? userNamesList[0].metadata.source.id
      : null;

  // User Avatar
  const userAvatar =
    userPhotosList && userPhotosList[0].url ? userPhotosList[0].url : null;

  // User Email
  const userEmail =
    userEmailsList && userEmailsList[0].value ? userEmailsList[0].value : null;

  if (!userId || !userName || !userAvatar || !userEmail) {
    throw new Error("Google login error");
  }
  const updateRes = await db.users.findOneAndUpdate(
    { _id: userId },
    {
      $set: {
        name: userName,
        avatar: userAvatar,
        email: userEmail,
        token
      }
    },
    { returnOriginal: false }
  );

  let viewer = updateRes.value;
  if (!viewer) {
    const insertResult = await db.users.insertOne({
      _id: userId,
      token,
      name: userName,
      avatar: userAvatar,
      email: userEmail,
      tasks: [],
      pomCycle: PomCycle.Pomodoro
    });
    viewer = insertResult.ops[0];
  }

  const cryptr = new Cryptr(process.env.SECRET);
  const encryptedUserId = cryptr.encrypt(userId);

  setCookie(res, "viewer", encryptedUserId, {
    ...cookieOptions,
    maxAge: 365 * 24 * 60 * 60 * 1000
  });

  return viewer;
};
