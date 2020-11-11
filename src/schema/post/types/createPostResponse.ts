import { unionType } from "@nexus/schema";
import { CreatePost } from "./createPost";

export const CreatePostResponse = unionType({
  name: "CreatePostResponse",
  description: "The type of the possible results from the createPost mutation",
  definition(t) {
    t.members(CreatePost);
    t.resolveType((root) => "Post");
  },
});
