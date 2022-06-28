import { GraphQLClient } from "graphql-request";

const endpoint =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api/graphql"
    : process.env.LIVE_URL;

function getXCSRFToken() {
  const token = sessionStorage.getItem("token");
  return {
    "X-CSRF-TOKEN": token || ""
  };
}

export const graphqlClient = new GraphQLClient(endpoint, {
  headers: () => getXCSRFToken()
});
