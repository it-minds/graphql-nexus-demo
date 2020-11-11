import { schemaSegmentDeclaration } from "../schemaObjectTypeDeclaration";
import { GraphQLError } from "./types/graphQLError";

export const errorSchema = schemaSegmentDeclaration({
  types: [GraphQLError],
});
