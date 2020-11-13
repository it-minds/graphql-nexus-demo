import { GraphQLResolveInfo } from 'graphql';
import { AccessForbiddenError } from '../../error/accessForbiddenError';
import { UnauthenticatedError } from '../../error/unauthenticatedError';
import { AsyncResult } from '../../result/asyncResult';
import { Result } from '../../result/result';
import { isAuthorized } from './isAuthorized';

export function authorizedIf<TSource, TContext, TArgs, TResult, TError>(
  condition: (
    root: TSource,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo,
  ) => Result<boolean, UnauthenticatedError> | AsyncResult<boolean, UnauthenticatedError>,
  resolver: (root: TSource, args: TArgs, context: TContext, info: GraphQLResolveInfo) => AsyncResult<TResult, TError>,
): (
  root: TSource,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => PromiseLike<TResult | TError | UnauthenticatedError | AccessForbiddenError> {
  return (root, args, context, info) =>
    isAuthorized(condition)(root, args, context, info)
      .andThenAsync(() => resolver(root, args, context, info))
      .collect();
}
