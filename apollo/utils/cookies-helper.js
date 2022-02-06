import { serialize } from 'cookie';
/**
 * This sets `cookie` on `res` object
 * name -> "viewer"
 * value -> "userId"
 * options -> age, httpOnly, etc...
 */
export const setCookie = (res, name, value, options = {}) => {
  const stringValue =
    typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value);

  if ('maxAge' in options) {
    options.expires = new Date(Date.now() + options.maxAge);
    options.maxAge /= 1000;
  }

  res.setHeader('Set-Cookie', serialize(name, String(stringValue), options));
};

export const clearCookie = (res, name) => {
  res.setHeader('Set-Cookie', `${name}=; max-age=0`);
};
