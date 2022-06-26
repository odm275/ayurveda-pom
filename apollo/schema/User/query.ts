import { extendType, stringArg } from "nexus";
import { Google } from "apollo/api/Google";
import { User } from "./user";
import { authorize } from "@/apollo/utils/authorize";
import { Task } from "../Task";
import { logInViaCookie } from "./helpers";
import crypto from "crypto";

export const ViewerQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.field("me", {
      type: User,
      async resolve(_root, _args, { req, res, prisma }) {
        const token = crypto.randomBytes(16).toString("hex");

        const viewer = await logInViaCookie({ token, prisma, req, res });

        if (!viewer) {
          return {
            didRequest: true
          };
        }

        const resViewer = {
          id: viewer.id,
          name: viewer.name,
          token: viewer.token,
          avatar: viewer.avatar,
          didRequest: true,
          pomDuration: viewer.pomDuration,
          shortBreakDuration: viewer.shortBreakDuration,
          longBreakDuration: viewer.shortBreakDuration,
          longBreakInterval: viewer.longBreakInterval,
          pomCycle: viewer.pomCycle
        };

        return resViewer;
      }
    });
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
    t.list.field("viewerCurrentTasks", {
      type: Task,
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
