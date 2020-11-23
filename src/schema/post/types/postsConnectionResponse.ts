import { unionType } from '@nexus/schema';
import { GraphQLInvalidIdentifierError } from '../../error/types/graphQLInvalidIdentifierError';
import { PostResponseConnection } from './postsConnection';

export const PostsConnectionResponse = unionType({
  name: 'PostsConnectionResponse',
  definition(t) {
    t.members(PostResponseConnection, GraphQLInvalidIdentifierError);
    t.resolveType((root) => root.__typename);
  },
});
