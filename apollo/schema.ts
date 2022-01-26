import { makeExecutableSchema } from '@graphql-tools/schema'
import { nexusSchema, typeDefs } from './type-defs';

import { resolvers } from './resolvers';

export const schema = makeExecutableSchema({
  // typeDefs,
  typeDefs: nexusSchema,
  resolvers
});
