import { unionType } from '@nexus/schema';
import { GraphQLAccessForbiddenError } from '../../error/types/graphQLAccessForbiddenError';
import { GraphQLUnauthenticatedError } from '../../error/types/graphQLUnauthenticatedError';
import { CreatePost } from './createPost';

export const CreatePostResponse = unionType({
  name: 'CreatePostResponse',
  description: 'The type of the possible results from the createPost mutation',
  definition(t) {
    t.members(CreatePost, GraphQLUnauthenticatedError, GraphQLAccessForbiddenError);
    t.resolveType((root) => root.__typename);
  },
});
