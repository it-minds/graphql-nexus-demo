import { schemaSegmentDeclaration } from '../schemaObjectTypeDeclaration';
import { GraphQLAccessForbiddenError } from './types/graphQLAccessForbiddenError';
import { GraphQLError } from './types/graphQLError';
import { GraphQLInvalidIdentifierError } from './types/graphQLInvalidIdentifierError';
import { GraphQLNotFoundError } from './types/graphQLNotFoundError';
import { GraphQLUnauthenticatedError } from './types/graphQLUnauthenticatedError';

export const ErrorSchema = schemaSegmentDeclaration({
  types: [
    GraphQLInvalidIdentifierError,
    GraphQLNotFoundError,
    GraphQLError,
    GraphQLUnauthenticatedError,
    GraphQLAccessForbiddenError,
  ],
});
