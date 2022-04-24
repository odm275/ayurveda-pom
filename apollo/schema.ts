import { makeSchema } from "nexus";
import { join } from "path";
import * as types from "./schema/index";

export const baseSchema = makeSchema({
  types: [types],
  outputs: {
    typegen: join(
      process.cwd(),
      "node_modules",
      "@types",
      "nexus-typegen",
      "index.d.ts"
    ),
    schema: join(process.cwd(), "apollo", "schema.graphql")
  },
  contextType: {
    export: "Context",
    module: join(process.cwd(), "apollo", "createContext.ts")
  },
  sourceTypes: {
    modules: [
      {
        module: "@prisma/client",
        alias: "prisma"
      }
    ]
  }
});

export const nexusSchema = baseSchema;
