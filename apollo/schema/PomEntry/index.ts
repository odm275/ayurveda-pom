import { objectType } from "nexus";

export const PomEntry = objectType({
  name: "PomEntry",
  definition(t) {
    t.id("id");
    t.field("createdAt", { type: "DateTime" });
    t.field("updatedAt", { type: "DateTime" });
    t.int("count");
    t.string("userId");
  }
});
