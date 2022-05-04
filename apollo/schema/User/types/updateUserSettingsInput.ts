import { inputObjectType } from "nexus";
import { PomCycle } from "../../enums/PomCycle";

export const UpdateUserSettingsInput = inputObjectType({
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
