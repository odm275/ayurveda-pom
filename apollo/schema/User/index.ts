import { objectType, arg } from "nexus";
import { PomCycle } from "../enums/PomCycle";
import { Task } from "../Task";
import { PomData } from "../Viewer";
import { PomEntry } from "../PomEntry";
import { Context } from "@/apollo/types/context";

export const User = objectType({
  name: "User",
  definition(t) {
    t.nonNull.id("id", {
      description: "Unique ID for the User"
    });
    t.nonNull.string("name", { description: "name of the User" });
    t.nonNull.string("status");
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
      description: "enum for reference pomodoro cycles by a string name"
    });
    t.nonNull.list.field("pomEntry", {
      description: "List of pomEntry(s)",
      type: PomEntry,
      async resolve(parent, _args, { prisma }: Context) {
        return await prisma.pomEntrys
          .findUnique({
            where: {
              id: parent.id
            }
          })
          .pomEntrys();
      }
    });
    t.nonNull.list.field("tasks", {
      type: Task,
      description: "Tasks for today's date",
      async resolve(parent, _args, { prisma }) {
        return await prisma.tasks
          .findUnique({
            where: {
              id: parent.id
            }
          })
          .tasks();
      }
    });
  }
});
