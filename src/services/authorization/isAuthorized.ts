import { GraphQLResolveInfo } from 'graphql';
import { AccessForbiddenError } from '../../error/accessForbiddenError';
import { UnauthenticatedError } from '../../error/unauthenticatedError';
import { AsyncResult } from '../../result/asyncResult';
import { Result } from '../../result/result';

export function isAuthorized<TSource, TContext, TArgs>(
  condition: (
    root: TSource,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo,
  ) => Result<boolean, UnauthenticatedError> | AsyncResult<boolean, UnauthenticatedError>,
): (
  root: TSource,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncResult<never, UnauthenticatedError | AccessForbiddenError> {
  return (root, args, context, info) => {
    const hasAccess = condition(root, args, context, info);
    return (hasAccess instanceof AsyncResult
      ? hasAccess.andThen<never, AccessForbiddenError>((access) =>
          access ? Result.ok() : Result.error(new AccessForbiddenError()),
        )
      : hasAccess.andThen<never, AccessForbiddenError>((access) =>
          access ? Result.ok() : Result.error(new AccessForbiddenError()),
        )
    ).andThenAsync(async () => Result.ok());
  };
}
