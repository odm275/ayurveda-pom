import { Database } from "@/database/types";

export const addPomDateCounter = async (
  db: Database,
  viewer: any,
  input: any
) => {
  const inputsNoDate = { ...input };
  delete inputsNoDate.date;

  const updateRes = await db.users.findOneAndUpdate(
    {
      _id: viewer._id,
      "pomData.date": input.date
    },
    {
      $inc: { "pomData.$.count": 1 },
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
