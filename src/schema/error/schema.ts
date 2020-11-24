import { GraphQLAccessForbiddenError } from './types/graphQLAccessForbiddenError';
import { GraphQLError } from './types/graphQLError';
import { GraphQLInvalidIdentifierError } from './types/graphQLInvalidIdentifierError';
import { GraphQLNotFoundError } from './types/graphQLNotFoundError';
import { GraphQLUnauthenticatedError } from './types/graphQLUnauthenticatedError';

export const errorTypes = [
  GraphQLInvalidIdentifierError,
  GraphQLNotFoundError,
  GraphQLError,
  GraphQLUnauthenticatedError,
  GraphQLAccessForbiddenError,
];
