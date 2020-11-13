import { objectType } from '@nexus/schema';
import { UnauthenticatedError } from '../../../error/unauthenticatedError';
import { GraphQLError } from './graphQLError';

export const GraphQLUnauthenticatedError = objectType({
  name: 'UnauthenticatedError',
  rootTyping: { name: 'GraphQLUnauthenticatedErrorRoot', path: __filename },
  definition(t) {
    t.implements(GraphQLError);
  },
});

export type GraphQLUnauthenticatedErrorRoot = UnauthenticatedError;
