import { inputObjectType } from "nexus";

export const CreateTaskInput = inputObjectType({
  name: "CreateTaskInput",
  definition(t) {
    t.string("title");
    t.int("amt");
    t.int("positionId");
    t.string("eta");
  }
});
