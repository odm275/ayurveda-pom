import { authorize } from "@/apollo/utils/authorize";
import { ObjectId } from "mongodb";
import { objectType, extendType, inputObjectType, arg } from "nexus";
import { CreateTaskInput, UpdateTasksPositionsInput } from "./types";

export const Task = objectType({
  name: "Task",
  definition(t) {
    t.id("id");
    t.DateTime("createdAt");
    t.DateTime("updatedAt");
    t.string("title");
    t.int("amt");
    t.int("positionId");
    t.string("userId");
    t.DateTime("eta");
  }
});

export const Tasks = objectType({
  name: "Tasks",
  definition(t) {
    t.list.field("tasks", { type: Task });
  }
});

const DeleteTaskViewerInput = inputObjectType({
  name: "DeleteTaskViewerInput",
  definition(t) {
    t.nonNull.string("id");
  }
});

export const TaskMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createTask", {
      type: Task,
      args: {
        input: arg({ type: CreateTaskInput })
      },
      async resolve(__root: undefined, { input }, { db, req, prisma }) {
        const viewer = await authorize({ prisma, req });
        if (!viewer) {
          throw new Error("Viewer cannot be found!");
        }
        const newTask = prisma.task.create({
          data: {
            userId: viewer.id,
            title: input.title,
            amt: input.amt,
            eta: new Date(input.eta),
            positionId: input.positionId
          }
        });
        return newTask;
      }
    });
    t.nonNull.field("updateTasksPositions", {
      type: Tasks,
      args: {
        input: arg({ type: UpdateTasksPositionsInput })
      },
      async resolve(__root: undefined, { input }, { db, req, prisma }) {
        const viewer = await authorize({ prisma, req });
        if (!viewer) {
          throw new Error("Viewer cannot be found!");
        }

        const updaterArr = input.taskIds.map((taskId, i) => ({
          id: taskId.id,
          positionId: i
        }));

        const response = updaterArr.map(async ({ id, positionId }) => {
          const updatedTask = await prisma.task.update({
            where: {
              id
            },
            data: {
              positionId
            }
          });
          return updatedTask;
        });

        const resolveRes = await Promise.all(response);
        console.log("resolveRes", resolveRes);
        return resolveRes;
      }
    });

    t.nonNull.field("deleteTask", {
      type: Task,
      args: {
        input: arg({ type: DeleteTaskViewerInput })
      },
      async resolve(__root: undefined, { input }, { db, req }) {
        const viewer = await authorize({ db, req });
        if (!viewer) {
          throw new Error("Viewer cannot be found!");
        }
        const deletedTaskRes = await db.tasks.findOneAndDelete({
          _id: new ObjectId(input.id)
        });

        const deletedTask = deletedTaskRes.value;

        return deletedTask;
      }
    });
  }
});
