import { NextApiRequest, NextApiResponse } from 'next';
import { IResolvers } from 'graphql-tools';
import crypto from 'crypto';
import Cryptr from 'cryptr';
import dayjs from 'dayjs';
import {
  UpdateUserSettingsArgs,
  LogInArgs,
  UserPomCountArgs,
  ViewerTasksData
} from './types';
import { Viewer, Database, User, PomCycle } from '../../../database/types';
import { Google } from '../../api/Google';
import { authorize } from '@/apollo/utils/authorize';

const cookieOptions = {
  httpOnly: true,
  sameSite: true,
  signed: true,
  secure: process.env.NODE_ENV === 'development' ? false : true
};

interface Response extends NextApiResponse {
  cookie: (
    name: string,
    value: string,
    options?: {},
    res?: NextApiResponse
  ) => void;

  clearCookie: (res: NextApiResponse, name: string) => void;
}

const logInViaGoogle = async (
  code: string,
  token: string,
  db: Database,
  res: Response
): Promise<User | undefined> => {
  const { user } = await Google.logIn(code);

  if (!user) {
    throw new Error('Google login error');
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
    throw new Error('Google login error');
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

  // Typescript tries to type
  res.cookie('viewer', encryptedUserId, {
    ...cookieOptions,
    maxAge: 365 * 24 * 60 * 60 * 1000
  });

  return viewer;
};

const logInViaCookie = async (
  token: string,
  db: Database,
  req: NextApiRequest,
  res: Response
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
    res.clearCookie(res, 'viewer');
  }
  return viewer;
};

const addPomDateCounter = async (db: Database, viewer: User, input: any) => {
  const inputsNoDate = { ...input };
  delete inputsNoDate.date;

  const updateRes = await db.users.findOneAndUpdate(
    {
      _id: viewer._id,
      'pomData.date': input.date
    },
    {
      $inc: { 'pomData.$.count': 1 },
      $set: inputsNoDate
    },
    { returnOriginal: false }
  );
  if (!updateRes.value) {
    // updateRes doesn't exists -> date from input wasn't found so we create a new record for it and initialize it at one.
    const updateRes = await db.users.findOneAndUpdate(
      {
        _id: viewer._id
      },
      {
        $push: {
          pomData: { $each: [{ date: input.date, count: 1 }] }
        },
        $set: inputsNoDate
      }
    );
    const updatedViewer = updateRes.value;
    return updatedViewer;
  }
  const updatedViewer = updateRes.value;
  return updatedViewer;
};

export const viewerResolvers: IResolvers = {
  Query: {
    authUrl: (): string => {
      try {
        return Google.authUrl;
      } catch (error) {
        throw new Error(`Failed to query Google Auth Url: ${error}`);
      }
    }
  },
  Mutation: {
    updateUserSettings: async (
      __root: undefined,
      { input }: UpdateUserSettingsArgs,
      { db, req, res }: { db: Database; req: NextApiRequest; res: Response }
    ): Promise<User | undefined> => {
      console.log('updateUserSettings');
      const viewer = await authorize(db, req);
      if (!viewer) {
        throw new Error('viewer cannot be found');
      }

      // If optional parameter with today's date is provided
      if (input.date) {
        const updatedViewer = addPomDateCounter(db, viewer, input);
        console.log('updatedViewerPomCount', updatedViewer);
        return updatedViewer;
      } else {
        const updateRes = await db.users.findOneAndUpdate(
          {
            _id: viewer._id
          },
          {
            $set: input
          },
          { returnOriginal: false }
        );

        const updatedViewer = updateRes.value;
        return updatedViewer;
      }
    },
    logIn: async (
      __root: undefined,
      { input, date }: LogInArgs,
      { db, req, res }: { db: Database; req: NextApiRequest; res: Response }
    ): Promise<Viewer> => {
      try {
        const code = input ? input.code : null; // Comes from google after clicking sign in and being re-directed back to the app
        const token = crypto.randomBytes(16).toString('hex');

        const viewer: User | undefined = code
          ? await logInViaGoogle(code, token, db, res)
          : await logInViaCookie(token, db, req, res); // req object will have the cookie
        if (!viewer) {
          return {
            didRequest: true
          };
        }

        const resViewer: Viewer = {
          _id: viewer._id,
          token: viewer.token,
          avatar: viewer.avatar,
          walletId: viewer.walletId,
          didRequest: true,
          pomDuration: viewer.pomDuration,
          shortBreakDuration: viewer.shortBreakDuration,
          longBreakDuration: viewer.shortBreakDuration,
          longBreakInterval: viewer.longBreakInterval,
          pomCycle: viewer.pomCycle,
          pomData: viewer.pomData,
          tasks: viewer.tasks
        };

        return resViewer;
      } catch (error) {
        throw new Error(`Failed to log in: ${error}`);
      }
    },
    logOut: (
      _root: undefined,
      _args: {},
      { res }: { res: Response }
    ): Viewer => {
      try {
        res.clearCookie(res, 'viewer');
        return { didRequest: true };
      } catch (error) {
        throw new Error(`Failed to log out: ${error}`);
      }
    }
  },
  Viewer: {
    id: (viewer: Viewer): string | undefined => {
      return viewer._id;
    },
    hasWallet: (viewer: Viewer): boolean | undefined => {
      return viewer.walletId ? true : undefined;
    },
    pomCount: (
      viewer: Viewer,
      { date }: UserPomCountArgs,
      { db }: { db: Database }
    ): number | undefined => {
      const todayViewerEntry = viewer.pomData.find(
        (entry) => entry.date === date
      );
      const pomCount = todayViewerEntry ? todayViewerEntry.count : 0;

      return pomCount;
    },
    tasks: async (
      viewer: Viewer,
      _args: {},
      { db }: { db: Database }
    ): Promise<ViewerTasksData | null> => {
      // Array of tasks for the viewer [1111,2222,3333]
      console.log('tasks resolver');

      try {
        const data: ViewerTasksData = {
          total: 0,
          result: []
        };
        const cursor = await db.tasks.find({
          _id: { $in: viewer.tasks }
        });

        data.total = await cursor.count();
        data.result = await cursor.toArray();

        console.log('data.result', data.result);
        return data;
      } catch (error) {
        throw new Error(`Failed to query viewer tasks ${error}`);
      }
    }
  }
};
