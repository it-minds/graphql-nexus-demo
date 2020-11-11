import {
  NexusObjectTypeDef,
  NexusUnionTypeDef,
  ObjectDefinitionBlock,
} from "@nexus/schema/dist/core";

export interface SchemaObjectTypeDeclaration {
  query?: (t: ObjectDefinitionBlock<"Query">) => void;
  mutation?: (t: ObjectDefinitionBlock<"Mutation">) => void;
  types?: Array<NexusObjectTypeDef<any> | NexusUnionTypeDef<any>>;
}

export function schemaSegmentDeclaration(
  declaration: SchemaObjectTypeDeclaration
) {
  return declaration;
}
