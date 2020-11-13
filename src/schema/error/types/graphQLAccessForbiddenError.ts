import { objectType } from '@nexus/schema';
import { AccessForbiddenError } from '../../../error/accessForbiddenError';
import { GraphQLError } from './graphQLError';

export const GraphQLAccessForbiddenError = objectType({
  name: 'AccessForbiddenError',
  rootTyping: { name: 'GraphQLAccessForbiddenErrorRoot', path: __filename },
  definition(t) {
    t.implements(GraphQLError);
  },
});

export type GraphQLAccessForbiddenErrorRoot = AccessForbiddenError;
