import cookies from '../../apollo/utils/cookies-helper';
import { ApolloServer } from 'apollo-server-micro';
import { schema } from '../../apollo/schema';
import { connectDatabase } from '../../database';

const apolloServer = new ApolloServer({
  schema,
  context: async ({ req, res }) => {
    const db = await connectDatabase();
    return { db, req, res };
  },
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors);
    console.log('networkError', networkError);
  }
});

export const config = {
  api: {
    bodyParser: false
  }
};

const handler = apolloServer.createHandler({ path: '/api/graphql' });

export default cookies(handler);
