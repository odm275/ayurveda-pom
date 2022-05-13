import { inputObjectType } from "nexus";
import { PomCycle } from "../../enums/PomCycle";

export const PomCycleUpdateInput = inputObjectType({
  name: "PomCycleUpdateInput",
  definition(t) {
    t.string("date");
    t.field("pomCycle", { type: PomCycle });
    t.boolean("increasePomCounter");
  }
});
