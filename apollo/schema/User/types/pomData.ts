import { objectType } from "nexus";
import { PomEntry } from "../../PomEntry";

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
