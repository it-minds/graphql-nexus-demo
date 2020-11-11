import { interfaceType } from "@nexus/schema";
import { graphQLErrorRootTypingImport } from "../../../models/graphQLErrorDataModel";

export const GraphQLError = interfaceType({
  name: "Error",
  description: "Represents an error",
  rootTyping: graphQLErrorRootTypingImport,
  definition(t) {
    t.string("description", { resolve: (root) => root.description });
  },
});
