import { objectType } from "@nexus/schema";
import { postDataModelRootTypingImport } from "../../../models/postDataModel";
import { Post } from "./post";

export const CreatePost = objectType({
  name: "CreatePost",
  rootTyping: postDataModelRootTypingImport,
  definition(t) {
    t.field("post", {
      type: Post,
      description: "The newly created post",
      nullable: false,
      resolve: (root, args, ctx) => root.post,
    });
  },
});
