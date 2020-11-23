import { unionType } from '@nexus/schema';
import { GraphQLInvalidIdentifierError } from '../../error/types/graphQLInvalidIdentifierError';
import { GraphQLNotFoundError } from '../../error/types/graphQLNotFoundError';
import { UserProfile } from './userProfile';

export const UserProfileResponse = unionType({
  name: 'UserProfileResponse',
  definition(t) {
    t.members(UserProfile, GraphQLNotFoundError, GraphQLInvalidIdentifierError);
    t.resolveType((root) => root.__typename);
  },
});
