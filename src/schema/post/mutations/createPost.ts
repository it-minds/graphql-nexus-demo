import { booleanArg, mutationField, stringArg } from '@nexus/schema';
import { AuthorizationIdentity } from '../../../services/authorization/authorizationIdentity';
import { authorizedIf } from '../../../services/authorization/authorizedIf';
import { isAdmin } from '../../../services/authorization/conditions/isAdmin';
import { CreatePostResponse } from '../types/createPostResponse';

export const createPost = mutationField((t) =>
  t.field('createPost', {
    type: CreatePostResponse,
    args: {
      title: stringArg({
        required: true,
        description: 'The title of the post.',
      }),
      content: stringArg({
        required: true,
        description: 'The contents of the post.',
      }),
      published: booleanArg({
        required: false,
        description: 'Should the post be published?',
        default: true,
      }),
    },
    description: 'Creates a new post, authored by the current user.',
    nullable: false,
    resolve: authorizedIf(isAdmin, (_, { title, content, published }, ctx) =>
      ctx.authorization.currentIdentity.andThenAsync((identity: AuthorizationIdentity) =>
        ctx.posts.create({
          title,
          content,
          published: published ?? false,
          authorId: identity.userId,
        }),
      ),
    ),
  }),
);
