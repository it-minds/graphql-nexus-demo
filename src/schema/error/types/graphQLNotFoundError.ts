import { objectType } from '@nexus/schema';
import { NotFoundError } from '../../../error/notFoundError';
import { GraphQLError } from './graphQLError';

export const GraphQLNotFoundError = objectType({
  name: 'NotFoundError',
  rootTyping: { name: 'GraphQLNotFoundErrorRoot', path: __filename },
  definition(t) {
    t.implements(GraphQLError);
  },
});

export type GraphQLNotFoundErrorRoot = NotFoundError;
