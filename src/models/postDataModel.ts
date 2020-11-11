import { RootTypingImport } from "@nexus/schema/dist/core";
import { DateTime } from "luxon";

export interface PostDataModel {
  id: string;
  createdAt: DateTime;
  title: string;
  content: string;
  published: boolean;
  authorId: string;
}

export const postDataModelRootTypingImport: RootTypingImport = {
  name: "PostDataModel",
  path: __filename,
};
