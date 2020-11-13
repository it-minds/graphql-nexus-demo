import { GraphQLResolveInfo } from 'graphql';
import { UnauthenticatedError } from '../../../error/unauthenticatedError';
import { Result } from '../../../result/result';
import { RequestContext } from '../../../schema/context';
import { UserRole } from '../userRole';

export function isAdmin<TSource = any, TArgs = any>(
  root: TSource,
  args: TArgs,
  context: RequestContext,
  info: GraphQLResolveInfo,
): Result<boolean, UnauthenticatedError> {
  return context.authorization.currentIdentity.andThen((identity) => Result.ok(identity.role === UserRole.Admin));
}
