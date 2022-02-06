import { ObjectId } from "mongodb";

export const updateTasksPositions = async (db, tasksData) => {
  const bulkWriteData = tasksData.map(
    ({ id, positionId, amt, isFinished, isNew }) => {
      return {
        updateOne: {
          filter: { _id: new ObjectId(id) },
          update: { $set: { positionId, amt, isFinished, isNew } }
        }
      };
    }
  );
  console.log(JSON.stringify(bulkWriteData));
  await db.tasks.bulkWrite(bulkWriteData);
};
