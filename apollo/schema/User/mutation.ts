import { arg, extendType, stringArg } from "nexus";
import crypto from "crypto";
import { User } from "../User";
import { logInViaGoogle, logInViaCookie, addPomDateCounter } from "./helpers";
import { clearCookie } from "@/apollo/utils/cookies-helper";
import { authorize } from "@/apollo/utils/authorize";
import {
  UpdateUserSettingsInput,
  UpdateViewerDataInput,
  LogInInput
} from "./types";

export const UserMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("logIn", {
      type: User,
      args: {
        input: arg({ type: LogInInput }),
        date: stringArg()
      },
      async resolve(_root, { input }, { req, res, prisma }) {
        try {
          const code = input ? input.code : null; // Comes from google after clicking sign in and being re-directed back to the app
          const token = crypto.randomBytes(16).toString("hex");
          const viewer = code
            ? await logInViaGoogle({ code, token, prisma, res })
            : await logInViaCookie({ token, prisma, req, res });

          if (!viewer) {
            console.log("no viewer was found");
            return {
              didRequest: true
            };
          }

          const resViewer = {
            id: viewer.id,
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

    t.nonNull.field("updateUserSettings", {
      type: User,
      description:
        "updates user in database when a pomodoro counter goes up, and when settings change",
      args: {
        input: arg({ type: UpdateUserSettingsInput })
      },
      async resolve(
        __root: undefined,
        { input },
        { db, req, res }: { db; req; res }
      ) {
        console.log("updateUserSettings");
        const viewer = await authorize(db, req);
        if (!viewer) {
          throw new Error("viewer cannot be found");
        }

        // If optional parameter with today's date is provided
        if (input.date) {
          const updatedViewer = addPomDateCounter(db, viewer, input);
          return updatedViewer;
        } else {
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
        console.log("update viewer data");
        const viewer = await authorize(db, req);
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
