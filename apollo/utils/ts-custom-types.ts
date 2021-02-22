// Custom typescript that come up at least twice
import { NextApiResponse } from 'next';

export interface Response extends NextApiResponse {
  cookie: (
    name: string,
    value: string,
    options?: {},
    res?: NextApiResponse
  ) => void;

  clearCookie: (res: NextApiResponse, name: string) => void;
}
