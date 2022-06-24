import { ApolloServer } from "apollo-server-micro";
import { PageConfig } from "next";
import { nexusSchema } from "../../apollo/schema";
import { createContext } from "../../apollo/createContext";
import Cors from "micro-cors";

const cors = Cors({
  origin: "http://localhost:3000/*",
  allowCredentials: true
});

const apolloServer = new ApolloServer({
  context: createContext,
  schema: nexusSchema
});

const startServer = apolloServer.start();
export default async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://studio.apollographql.com"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }
  await startServer;

  await apolloServer.createHandler({
    path: "/api/graphql"
  })(req, res);
};

// // Apollo Server Micro takes care of body parsing
export const config: PageConfig = {
  api: {
    bodyParser: false
  }
};
