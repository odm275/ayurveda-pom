import { list, nonNull, objectType, stringArg } from "nexus";
import { PomCycle } from "../enums/PomCycle";
import { Task } from "../Task";
import { PomEntry } from "../PomEntry";
import { PomData, LogInInput } from "./types";

export const User = objectType({
  name: "User",
  definition(t) {
    // Viewer Fields
    t.nonNull.boolean("didRequest", {
      description:
        "(not a db field) Confirmation that the user's request came back to the client"
    });
    // User Fields
    t.nonNull.id("id", {
      description: "Unique ID for the User"
    });
    t.nonNull.string("name", {
      description: "Name of the User"
    });
    t.string("avatar", { description: "User avatar(picture)" });
    t.string("token");
    t.int("pomDuration", { description: "Generic duration for pomodoro" });
    t.int("shortBreakDuration", { description: "Short break after pomodoro" });
    t.int("longBreakDuration", {
      description: "Long break after a certain amt of pomodoro cycles are met"
    });
    t.int("longBreakInterval", {
      description:
        "The amt of pomodoro cycles(pom,shortBreak) that have to happen before a long break"
    });
    t.nonNull.field("pomCycle", {
      type: PomCycle,
      description: "Current cycle(shortbreak, longbreak, or pomodoro)"
    });
    t.field("pomEntry", {
      description: "Find the PomEntry for TODAY",
      type: PomEntry,
      args: {
        date: nonNull(stringArg())
      },
      async resolve({ id }, { date }, { prisma }): Promise<any> {
        try {
          const allUserPomEntries = await prisma.pomEntry.findFirst({
            where: {
              id: id,
              createdAt: {
                equals: new Date(date)
              }
            }
          });
          return allUserPomEntries;
        } catch (e) {
          console.log(e);
        }
      }
    });
    t.nonNull.list.field("tasks", {
      type: Task,
      description: "All tasks for an User",
      async resolve({ id }, _args, { prisma }): Promise<any> {
        try {
          const userTasks = await prisma.task.findMany({
            where: {
              userId: id
            }
          });
          console.log("userTasks", userTasks);
          if (!userTasks) return [];
          return userTasks;
        } catch (e) {
          console.log(e);
        }
      }
    });
  }
});
