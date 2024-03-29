import { arg, extendType, stringArg } from "nexus";
import crypto from "crypto";
import { User } from "../User";
import { logInViaGoogle, logInViaCookie, addPomDateCounter } from "./helpers";
import { clearCookie } from "@/apollo/utils/cookies-helper";
import { authorize } from "@/apollo/utils/authorize";
import {
  UpdateViewerSettingsInput,
  UpdateViewerDataInput,
  LogInInput,
  PomCycleUpdateInput
} from "./types";

export const UserMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("logIn", {
      type: User,
      args: {
        input: arg({ type: LogInInput }),
        date: stringArg(),
        today: stringArg()
      },
      async resolve(_root, { input }, { req, res, prisma }) {
        try {
          const code = input ? input.code : null; // Comes from google after clicking sign in and being re-directed back to the app
          const token = crypto.randomBytes(16).toString("hex");

          const viewer = code
            ? await logInViaGoogle({ code, token, prisma, res })
            : await logInViaCookie({ token, prisma, req, res });

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
        } catch (error) {
          throw new Error(`Failed to log in: ${error}`);
        }
      }
    });

    t.nonNull.field("logOut", {
      type: User,
      async resolve(_root, _args, { res }) {
        try {
          clearCookie(res, "viewer");
          return { didRequest: true };
        } catch (error) {
          throw new Error(`Failed to log out: ${error}`);
        }
      }
    });

    t.nonNull.field("updateViewerSettings", {
      type: User,
      description: "Update when Viewer Settings change",
      args: {
        input: arg({ type: UpdateViewerSettingsInput })
      },
      async resolve(__root: undefined, { input }, { db, req, res, prisma }) {
        const viewer = await authorize({ prisma, req });
        if (!viewer) {
          throw new Error("viewer cannot be found");
        }

        // If optional parameter with today's date is provided

        const updatedUser = await prisma.user.update({
          where: {
            id: viewer.id
          },
          data: {
            pomDuration: input.pomDuration,
            shortBreakDuration: input.shortBreakDuration,
            longBreakDuration: input.longBreakDuration,
            longBreakInterval: input.longBreakInterval
          }
        });

        return updatedUser;
      }
    });

    t.nonNull.field("pomCycleUpdate", {
      type: User,
      description:
        " Updates data that needs to be update whenever a pomodoro Cycle complates.",
      args: {
        input: arg({ type: PomCycleUpdateInput })
      },
      async resolve(__root: undefined, { input }, { db, req, res, prisma }) {
        const viewer = await authorize({ prisma, req, includeTasks: true });
        if (!viewer) {
          throw new Error("viewer cannot be found");
        }
        if (input.increasePomCounter) {
          // This will find an unique record but prisma is dumb and
          // won't let me do "where" with multiple options.
          const pomEntry = prisma.pomEntry.updateMany({
            where: {
              userId: viewer.id,
              date: input.date
            },
            data: {
              count: {
                increment: 1
              }
            }
          });
          if (!pomEntry) {
            prisma.pomEntry.create({
              data: {
                userId: viewer.id,
                count: 1,
                date: input.date
              }
            });
          }
        }

        const updatedViewer = prisma.user.update({
          where: {
            id: viewer.id
          },
          data: {
            pomCycle: input.pomCycle
          }
        });
        return updatedViewer;
      }
    });

    t.nonNull.field("updateViewerData", {
      type: User,
      description:
        "Updates Viewer in database when a pomodoro counter goes up or when settings change.",
      args: {
        input: arg({ type: UpdateViewerDataInput })
      },
      async resolve(
        __root: undefined,
        { input },
        { db, req, res }: { db; req; res }
      ) {
        const viewer = await authorize({ db, req });
        if (!viewer) {
          throw new Error("viewer cannot be found");
        }

        if (input.increasePomCounter) {
          const updatedViewer = addPomDateCounter(db, viewer, input);
          return updatedViewer;
        }
        const updateRes = await db.users.findOneAndUpdate(
          {
            _id: viewer._id
          },
          {
            $set: input
          },
          { returnOriginal: false }
        );

        const updatedViewer = updateRes.value;
        return updatedViewer;
      }
    });
  }
});
