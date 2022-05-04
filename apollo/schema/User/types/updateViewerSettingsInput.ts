import { inputObjectType } from "nexus";

export const UpdateViewerSettingsInput = inputObjectType({
  name: "UpdateViewerSettingsInput",
  definition(t) {
    t.int("pomDuration");
    t.int("shortBreakDuration");
    t.int("longBreakDuration");
    t.int("longBreakInterval");
  }
});
