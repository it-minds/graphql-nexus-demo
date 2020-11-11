import { booleanArg, idArg, stringArg } from "@nexus/schema";
import { schemaSegmentDeclaration } from "../schemaObjectTypeDeclaration";
import { CreatePost } from "./types/createPost";
import { CreatePostResponse } from "./types/createPostResponse";
import { Post } from "./types/post";
import { PostResponse } from "./types/postResponse";

export const PostSchema = schemaSegmentDeclaration({
  query: (t) => {
    t.field("post", {
      type: PostResponse,
      args: {
        id: idArg({ required: true }),
      },
      resolve: async (root, { id }, ctx) => {
        return (await ctx.posts.getPostById(id)) as any;
      },
    });
  },
  mutation: (t) => {
    t.field("createPost", {
      type: CreatePostResponse,
      args: {
        title: stringArg({
          required: true,
          description: "The title of the post.",
        }),
        content: stringArg({
          required: true,
          description: "The contents of the post.",
        }),
        published: booleanArg({
          required: false,
          description: "Should the post be published?",
          default: true,
        }),
      },
      description: "Creates a new post, authored by the current user.",
      nullable: false,
      resolve: (root, { title, content, published }, ctx) =>
        ctx.authorization.userId.andThenAsync((authorId: string) =>
          ctx.posts.create({
            title,
            content,
            published: published || false,
            authorId,
          })
        ),
    });
  },
  types: [Post, PostResponse, CreatePost, CreatePostResponse],
});
