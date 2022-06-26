import { GraphQLClient } from "graphql-request";

const endpoint = "api/graphql";

function getXCSRFToken() {
  const token = sessionStorage.getItem("token");
  return {
    "X-CSRF-TOKEN": token || ""
  };
}

export const graphqlClient = new GraphQLClient(endpoint, {
  headers: () => getXCSRFToken()
});
