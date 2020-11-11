import { objectType } from "@nexus/schema";
import { GraphQLError } from "./graphQLError";

export const GraphQLNotFoundError = objectType({
  name: "NotFoundError",
  definition(t) {
    t.implements(GraphQLError);
  },
});
