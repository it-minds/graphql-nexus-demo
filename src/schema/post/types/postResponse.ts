import { unionType } from '@nexus/schema';
import { GraphQLInvalidIdentifierError } from '../../error/types/graphQLInvalidIdentifierError';
import { GraphQLNotFoundError } from '../../error/types/graphQLNotFoundError';
import { Post } from './post';

export const PostResponse = unionType({
  name: 'PostResponse',
  description: 'The type of the possible results from the post query',
  definition(t) {
    t.members(Post, GraphQLNotFoundError, GraphQLInvalidIdentifierError);
    t.resolveType((root) => root.__typename);
  },
});
