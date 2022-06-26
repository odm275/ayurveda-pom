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
import { PomEntry } from "../PomEntry";
import { PomCycle } from "../enums/PomCycle";
import { logInViaGoogle, logInViaCookie } from "./helpers";
import { Google } from "apollo/api/Google";
import { clearCookie } from "@/apollo/utils/cookies-helper";
import { authorize } from "@/apollo/utils/authorize";
import { addPomDateCounter } from "./helpers";

export const PomData = objectType({
  name: "PomData",
  definition(t) {
    t.int("total", { description: "Total number of pomRecords" });
    t.nonNull.list.nonNull.field("result", {
      type: PomEntry,
      description:
        "All the PomEntry(s) for a User. Note: [PomEntry!]! might be incorrect"
    });
  }
});

export const Viewer = objectType({
  name: "Viewer",
  definition(t) {
    t.id("id");
    t.string("token");
    t.string("avatar", { description: "User avatar(picture)" });

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
    t.nonNull.field("pomCycle", {
      type: PomCycle,
      description: "User properties that the Viewer also has"
    });
    t.nonNull.field("pomData", {
      type: PomData,
      description: "Amount of pomodoros completed per day for a Viewer",
      resolve(viewer, _args, _ctx) {
        if (viewer?.pomData) {
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
    t.nonNull.int("pomCount", {
      description: "pomodoro Count for the current day",
      args: {
        date: nonNull(stringArg())
      },
      resolve(viewer, { date }, _ctx) {
        if (viewer?.pomData) {
          return 0;
        }
        const todayViewerEntry = viewer.pomData.find(
          (entry) => entry.createdAt === new Date(date)
        );
        const pomCount = todayViewerEntry ? todayViewerEntry.count : 0;

        return pomCount;
      }
    });

    t.nonNull.field("currentTasks", {
      type: Tasks,
      description: "Tasks that aren't finished aka ongoing for the User",
      async resolve(viewer, _args, _ctx) {
        try {
          const data = {
            total: 0,
            result: []
          };
          if (viewer?.currentTasks) {
            data.total = viewer.currentTasks.length;
            data.result = viewer.currentTasks;
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
