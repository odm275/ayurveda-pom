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
    t.int("pomCount", {
      description: "Get the count for TODAY'S POM ENTRY",
      args: {
        today: nonNull(stringArg())
      },
      async resolve({ id }, { today }, { prisma }): Promise<any> {
        try {
          const todaysPomEntry = await prisma.pomEntry.findFirst({
            where: {
              id,
              date: today
            }
          });
          if (!todaysPomEntry) return 0;
          return todaysPomEntry.count;
        } catch (e) {
          console.log(e);
        }
      }
    });
    t.field("pomEntry", {
      description:
        "All the Pom Entries for all time. As in, all the work ever done counted",
      type: PomEntry,
      args: {
        date: nonNull(stringArg())
      },
      async resolve({ id }, { date }, { prisma }): Promise<any> {
        try {
          const allUserPomEntries = await prisma.pomEntry.findUnique({
            where: {
              id
            }
          });
          if (!allUserPomEntries) return [];
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
              userId: id,
              amt: {
                gte: 0
              }
            }
          });
          if (!userTasks) return [];
          const sortedUsetTasks = userTasks.sort(
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
