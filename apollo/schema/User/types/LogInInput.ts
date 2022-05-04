import { inputObjectType } from "nexus";

export const LogInInput = inputObjectType({
  name: "LogInInput",
  definition(t) {
    t.nonNull.string("code");
  }
});
