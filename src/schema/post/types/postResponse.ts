import { unionType } from "@nexus/schema";
import { Post } from "./post";

export const PostResponse = unionType({
  name: "PostResponse",
  description: "The type of the possible results from the post query",
  definition(t) {
    t.members(Post);
    t.resolveType((root) => "Post");
  },
});
