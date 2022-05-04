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
    module: join(process.cwd(), "apollo", "createContext.ts"),
    export: "Context",
    alias: "Context"
  },
  sourceTypes: {
    modules: [
      {
        module: "@prisma/client",
        alias: "prismaClient"
      }
    ]
  }
});

export const nexusSchema = baseSchema;
