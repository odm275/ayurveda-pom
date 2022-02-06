export const concatTasksToUser = async (db, viewer, newTasksDataIds) => {
  if (!viewer.tasks) {
    await db.users.findOneAndUpdate({ _id: viewer._id }, [
      {
        $set: {
          tasks: {
            $concatArrays: [{ $ifNull: ["$tasks", newTasksDataIds] }]
          }
        }
      }
    ]);
  } else {
    await db.users.findOneAndUpdate({ _id: viewer._id }, [
      { $set: { tasks: { $concatArrays: ["$tasks", newTasksDataIds] } } }
    ]);
  }
};
