import { objectType } from '@nexus/schema';
import { InvalidIdentifierError } from '../../../error/invalidIdentifierError';
import { GraphQLError } from './graphQLError';

export const GraphQLInvalidIdentifierError = objectType({
  name: 'InvalidIdentifierError',
  rootTyping: { name: 'GraphQLInvalidIdentifierErrorRoot', path: __filename },
  definition(t) {
    t.implements(GraphQLError);
    t.id('id', (error) => error.id);
  },
});

export type GraphQLInvalidIdentifierErrorRoot = InvalidIdentifierError;
