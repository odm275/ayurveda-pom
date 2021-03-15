const omitTypename = (key, value) => (key === '__typename' ? undefined : value);

export const newPayload = (payload) => {
  return JSON.parse(JSON.stringify(payload), omitTypename);
};
