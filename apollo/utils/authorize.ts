import { NextApiRequest } from 'next';
import { Database, User } from '@/database/types';
import Cryptr from 'cryptr';

export const authorize = async (
  db: Database,
  req: NextApiRequest
): Promise<User | null> => {
  const token = req.headers['x-csrf-token'] as string;

  const viewerCookie = req.cookies.viewer;
  const cryptr = new Cryptr(process.env.SECRET);
  const decryptedUserId = viewerCookie ? cryptr.decrypt(viewerCookie) : null;

  const viewer = await db.users.findOne({
    _id: decryptedUserId,
    token
  });
  return viewer;
};
