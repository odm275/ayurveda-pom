<<<<<<< HEAD
import { makeExecutableSchema } from '@graphql-tools/schema'
import { nexusSchema, typeDefs } from './type-defs';

import { resolvers } from './resolvers';

export const schema = makeExecutableSchema({
  // typeDefs,
  typeDefs: nexusSchema,
  resolvers
});
=======
import { makeExecutableSchema } from "@graphql-tools/schema";
import { nexusSchema, typeDefs } from "./type-defs";

import { resolvers } from "./resolvers";

// export const schema = makeExecutableSchema({
//   // typeDefs,
//   typeDefs: nexusSchema,
//   resolvers
// });
>>>>>>> nexus-refactor
