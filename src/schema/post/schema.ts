import { booleanArg, idArg, stringArg } from '@nexus/schema';
import { AuthorizationIdentity } from '../../services/authorization/authorizationIdentity';
import { authorizedIf } from '../../services/authorization/authorizedIf';
import { isAdmin } from '../../services/authorization/conditions/isAdmin';
import { schemaSegmentDeclaration } from '../schemaObjectTypeDeclaration';
import { CreatePost } from './types/createPost';
import { CreatePostResponse } from './types/createPostResponse';
import { Post } from './types/post';
import { PostResponse } from './types/postResponse';

export const PostSchema = schemaSegmentDeclaration({
  query: (t) => {
    t.field('post', {
      type: PostResponse,
      nullable: false,
      args: {
        id: idArg({ required: true }),
      },
      resolve: (root, { id }, ctx) => ctx.posts.getPostById(id).collect(),
    });
  },
  mutation: (t) => {
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
      resolve: authorizedIf(isAdmin, (root, { title, content, published }, ctx) =>
        ctx.authorization.currentIdentity.andThenAsync((identity: AuthorizationIdentity) =>
          ctx.posts.create({
            title,
            content,
            published: published ?? false,
            authorId: identity.userId,
          }),
        ),
      ),
    });
  },
  types: [Post, PostResponse, CreatePost, CreatePostResponse],
});
