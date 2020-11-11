import { RootTypingImport } from "@nexus/schema/dist/core";

export class GraphQLErrorDataModel extends Error {
  constructor(message?: string) {
    super(message);
  }
}

export type ErrorRootType = Error;

export const graphQLErrorRootTypingImport: RootTypingImport = {
  name: "ErrorRootType",
  path: __filename,
  alias: "Error",
};
