import { idArg, queryField } from '@nexus/schema';
import { PostResponse } from '../types/postResponse';

export const post = queryField((t) =>
  t.field('post', {
    type: PostResponse,
    nullable: false,
    args: {
      id: idArg({ required: true }),
    },
    resolve: (_, { id }, ctx) => ctx.posts.getPostById(id).collect(),
  }),
);
