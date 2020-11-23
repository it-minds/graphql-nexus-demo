import { unionType } from '@nexus/schema';
import { GraphQLInvalidIdentifierError } from '../../error/types/graphQLInvalidIdentifierError';
import { GraphQLNotFoundError } from '../../error/types/graphQLNotFoundError';
import { User } from './user';

export const UserResponse = unionType({
  name: 'UserResponse',
  description: 'The type of the possible results from the user query',
  definition(t) {
    t.members(User, GraphQLNotFoundError, GraphQLInvalidIdentifierError);
    t.resolveType((root) => root.__typename);
  },
});
