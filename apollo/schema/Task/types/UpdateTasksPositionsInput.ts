import { inputObjectType } from "nexus";

export const TaskId = inputObjectType({
  name: "TaskId",
  definition(t) {
    t.id("id");
  }
});
export const UpdateTasksPositionsInput = inputObjectType({
  name: "UpdateTasksPositionsInput",
  definition(t) {
    t.list.field("taskIds", { type: TaskId });
  }
});
