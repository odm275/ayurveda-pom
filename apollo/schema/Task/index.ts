import { authorize } from "@/apollo/utils/authorize";
import { ObjectId } from "mongodb";
import { objectType, extendType, inputObjectType, arg } from "nexus";
import { concatTasksToUser, updateTasksPositions } from "./helpers";

export const Task = objectType({
  name: "Task",
  definition(t) {
    t.id("id", {
      resolve: (task) => {
        return task._id.toString();
      }
    });
    t.string("title");
    t.int("amt");
    t.string("user");
    t.boolean("isNew");
    t.boolean("isFinished");
    t.string("category");
  }
});

export const Tasks = objectType({
  name: "Tasks",
  definition(t) {
    t.nonNull.int("total", {
      description: "The total number of tasks for a User"
    });
    t.nonNull.list.nonNull.field("result", {
      type: Task,
      description: "The total amt of tasks for a User"
    });
  }
});

const UpdateTaskUserInput = inputObjectType({
  name: "UpdateTaskUserInput",
  definition(t) {
    t.nonNull.list.field("tasks", { type: TaskInput });
  }
});

const TaskInput = inputObjectType({
  name: "TaskInput",
  definition(t) {
    t.string("id");
    t.string("title");
    t.int("amt");
    t.string("eta");
    t.boolean("isNew");
    t.boolean("isFinished");
  }
});

export const TaskMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("updateTasks", {
      type: Tasks,
      args: {
        input: arg({ type: UpdateTaskUserInput })
      },
      async resolve(__root: undefined, { input }, { db, req }) {
        console.log("updateTasks");
        console.log(input.tasks);

        const viewer = await authorize(db, req);

        if (!viewer) {
          throw new Error("Viewer cannot be found!");
        }

        // Set positions

        const tasksWPosition = input.tasks.map((task, i) => {
          return {
            ...task,
            amt: task.amt,
            positionId: i
          };
        });

        // Create ONLY New Tasks

        const newTasksData = tasksWPosition.filter((task) => task.isNew);
        console.log("newTasksData", newTasksData);

        if (newTasksData.length > 0) {
          console.log("new tasks coming in");
          const oldTasksData = tasksWPosition.filter((task) => !task.isNew);
          const newTasks = newTasksData.map(({ title, amt, positionId }) => ({
            _id: new ObjectId(),
            title,
            amt,
            user: viewer._id,
            isNew: false,
            isFinished: false,
            positionId: positionId
          }));

          const updateNewTasksPositionsData = newTasks.map(
            ({ _id, positionId, amt, isNew, isFinished }) => {
              return {
                id: _id.toString(),
                amt,
                isNew,
                isFinished,
                positionId
              };
            }
          );

          const updateOldTasksPositionsData = oldTasksData.map(
            ({ id, positionId, amt, isNew, isFinished }) => {
              return {
                id,
                amt,
                isNew,
                isFinished,
                positionId
              };
            }
          );

          const allTasksData = [
            ...updateOldTasksPositionsData,
            ...updateNewTasksPositionsData
          ];

          const insertResult = await db.tasks.insertMany(newTasks);
          const newTasksDataIds = Object.values(insertResult["insertedIds"]);
          // Merge new tasks with user's tasks.
          await concatTasksToUser(db, viewer, newTasksDataIds);

          await updateTasksPositions(db, allTasksData);

          const cursor = await db.tasks.find({
            isFinished: false
          });
          const unfinishedTasks = await cursor.toArray();
          const total = await cursor.count();

          return {
            result: unfinishedTasks,
            total: total
          };
        } else {
          // Get all the tasks are not finished

          await updateTasksPositions(db, tasksWPosition);

          const cursor = await db.tasks.find({
            isFinished: false
          });
          const unfinishedTasks = await cursor.toArray();
          const total = await cursor.count();

          // Update their position index

          return {
            result: unfinishedTasks,
            total: total
          };
        }
      }
    });
  }
});
