import { extendType, stringArg } from "nexus";
import { Google } from "apollo/api/Google";
import { User } from "./user";
import { authorize } from "@/apollo/utils/authorize";
import { Tasks } from "../Task";

export const ViewerQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.string("authUrl", {
      async resolve() {
        try {
          return Google.authUrl;
        } catch (error) {
          throw new Error(`Failed to query Google Auth Url: ${error}`);
        }
      }
    });
    t.nonNull.field("viewerPomData", {
      type: User,
      async resolve(_root, _args, { req, prisma }) {
        const viewer = await authorize({ prisma, req });
        if (!viewer) {
          throw new Error("viewer cannot be found");
        }
        return {
          pomDuration: viewer.pomDuration,
          pomCycle: viewer.pomCycle,
          shortBreakDuration: viewer.shortBreakDuration,
          longBreakDuration: viewer.longBreakDuration,
          longBreakInterval: viewer.longBreakInterval,
          didRequest: true
        };
      }
    });
    t.nonNull.field("viewerCurrentTasks", {
      type: Tasks,
      async resolve(_root, _args, { req, prisma }) {
        const viewer = await authorize({ prisma, req });
        if (!viewer) {
          throw new Error("viewer cannot be found");
        }
        try {
          const viewerTasks = await prisma.task.findMany({
            where: {
              userId: viewer.id,
              amt: {
                gte: 0
              }
            }
          });
          if (!viewerTasks) return [];
          const sortedUsetTasks = viewerTasks.sort(
            (a, b) => a.positionId - b.positionId
          );
          return sortedUsetTasks;
        } catch (e) {
          console.log(e);
        }
      }
    });
  }
});
