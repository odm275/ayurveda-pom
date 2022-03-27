import {
  objectType,
  nonNull,
  stringArg,
  extendType,
  inputObjectType,
  arg
} from "nexus";
import crypto from "crypto";
import { Tasks } from "../Task/index";
import { PomCycle } from "../enums/PomCycle";
import { logInViaGoogle, logInViaCookie } from "./helpers";
import { Viewer as SourceTypeViewer } from "@/database/types";
import { Google } from "apollo/api/Google";
import { clearCookie } from "@/apollo/utils/cookies-helper";
import { authorize } from "@/apollo/utils/authorize";
import { addPomDateCounter } from "./helpers";
import { resolve } from "path";

export const PomRecord = objectType({
  name: "PomRecord",
  description: "How many Pomodoros got done for a day",
  definition(t) {
    t.nonNull.string("date", { description: "date for record" });
    t.nonNull.int("count", {
      description: "How many pomodoros happened that day"
    });
  }
});

export const PomData = objectType({
  name: "PomData",
  definition(t) {
    t.int("total", { description: "Total number of pomRecords" });
    t.nonNull.list.nonNull.field("result", {
      type: PomRecord,
      description:
        "All the pomRecords for a User. Note: [PomRecord!]! might be incorrect"
    });
  }
});

export const Viewer = objectType({
  name: "Viewer",
  definition(t) {
    t.id("id", {
      description: "ID for a Viewer",
      resolve: (viewer) => {
        return viewer._id;
      }
    });
    t.string("token");
    t.string("avatar", { description: "User avatar(picture)" });
    t.boolean("hasWallet", {
      description:
        "Resolve this as a boolean since we don't want the actual walletId to make it to the client",
      resolve(viewer) {
        return viewer.walletId ? true : undefined;
      }
    });
    t.nonNull.boolean("didRequest", {
      description:
        "Confirmation that the user's request came back to the client"
    });
    t.int("pomDuration", {
      description: "User properties that the Viewer also has"
    });
    t.int("shortBreakDuration", {
      description: "User properties that the Viewer also has"
    });
    t.int("longBreakDuration", {
      description: "User properties that the Viewer also has"
    });
    t.int("longBreakInterval", {
      description: "User properties that the Viewer also has"
    });
    t.field("pomCycle", {
      type: PomCycle,
      description: "User properties that the Viewer also has"
    });

    t.nonNull.int("pomCount", {
      description: "pomodoro Count for the current day",
      args: {
        date: nonNull(stringArg())
      },
      resolve(viewer, { date }) {
        if (!viewer.pomData) {
          return 0;
        }
        const todayViewerEntry = viewer.pomData.find(
          (entry) => entry.date === date
        );
        const pomCount = todayViewerEntry ? todayViewerEntry.count : 0;

        return pomCount;
      }
    });
    t.nonNull.field("pomData", {
      type: PomData,
      description: "Amount of pomodoros completed per day for a Viewer",
      resolve(viewer) {
        if (!viewer.pomData) {
          return {
            result: [],
            total: 0
          };
        }
        return {
          result: viewer.pomData,
          total: viewer.pomData.length
        };
      }
    });
    t.nonNull.field("currentTasks", {
      type: Tasks,
      description: "Tasks that aren't finished aka ongoing for the User",
      async resolve(viewer, _args, { db }) {
        console.log("hi");
        try {
          const data = {
            total: 0,
            result: []
          };
          if (viewer?.currentTasks) {
            const cursor = await db.tasks.find({
              _id: { $in: viewer.currentTasks },
              isFinished: false
            });

            data.total = await cursor.count();
            data.result = await cursor.sort({ positionId: 1 }).toArray();
          }
          return data;
        } catch (error) {
          throw new Error(`Failed to query viewer tasks ${error}`);
        }
      }
    });
  }
});

const LogInInput = inputObjectType({
  name: "LogInInput",
  definition(t) {
    t.nonNull.string("code");
  }
});

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
  }
});

const UpdateUserSettingsInput = inputObjectType({
  name: "UpdateUserSettingsInput",
  definition(t) {
    t.int("pomDuration");
    t.int("shortBreakDuration");
    t.int("longBreakDuration");
    t.int("longBreakInterval");
    t.field("pomCycle", { type: PomCycle });
    t.string("date");
  }
});

export const ViewerMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("logIn", {
      type: Viewer,
      args: {
        input: arg({ type: LogInInput }),
        date: stringArg()
      },
      async resolve(_root, { input }, { db, req, res }) {
        try {
          const code = input ? input.code : null; // Comes from google after clicking sign in and being re-directed back to the app
          const token = crypto.randomBytes(16).toString("hex");
          const viewer = code
            ? await logInViaGoogle(code, token, db, res)
            : await logInViaCookie(token, db, req, res); // req object will have the cookie

          if (!viewer) {
            console.log("no viewer was found");
            return {
              didRequest: true
            };
          }

          const resViewer: SourceTypeViewer = {
            _id: viewer._id,
            token: viewer.token,
            avatar: viewer.avatar,
            walletId: viewer.walletId,
            didRequest: true,
            pomDuration: viewer.pomDuration,
            shortBreakDuration: viewer.shortBreakDuration,
            longBreakDuration: viewer.shortBreakDuration,
            longBreakInterval: viewer.longBreakInterval,
            pomCycle: viewer.pomCycle,
            pomData: viewer.pomData,
            currentTasks: viewer.tasks
          };

          return resViewer;
        } catch (error) {
          throw new Error(`Failed to log in: ${error}`);
        }
      }
    });

    t.nonNull.field("logOut", {
      type: Viewer,
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
      type: Viewer,
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
  }
});
