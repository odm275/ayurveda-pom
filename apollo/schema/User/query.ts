import { extendType } from "nexus";
import { Google } from "apollo/api/Google";

export const ViewerQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.string("authUrl", {
      async resolve() {
        try {
          return Google.authUrl;
        } catch (error) {
          throw new Error(`Failed to query Google Auth Url: ${error}`);
        }
      }
    });
  }
});
