import { GraphQLResolveInfo } from 'graphql';
import { UnauthenticatedError } from '../../../error/unauthenticatedError';
import { AsyncResult } from '../../../result/asyncResult';
import { Result } from '../../../result/result';

export function or<TSource, TContext, TArgs>(
  ...conditions: Array<
    (
      root: TSource,
      args: TArgs,
      context: TContext,
      info: GraphQLResolveInfo,
    ) => AsyncResult<boolean, UnauthenticatedError> | Result<boolean, UnauthenticatedError>
  >
): (
  root: TSource,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncResult<boolean, UnauthenticatedError> | Result<boolean, UnauthenticatedError> {
  return (root, args, context, info) => {
    const syncResults: Array<Result<boolean, UnauthenticatedError>> = [];
    const asyncResults: Array<AsyncResult<boolean, UnauthenticatedError>> = [];
    for (const condition of conditions) {
      const hasAccess = condition(root, args, context, info);
      if (hasAccess instanceof Result) {
        if (hasAccess.isOk() && hasAccess.ok) {
          return hasAccess;
        } else {
          syncResults.push(hasAccess);
        }
      } else if (hasAccess instanceof AsyncResult) {
        asyncResults.push(hasAccess);
      }
    }
    return asyncResults.length <= 0
      ? syncResults[0] || Result.ok(false)
      : AsyncResult.from<boolean, UnauthenticatedError>(
          Promise.all(
            asyncResults.map((asyncResult) =>
              asyncResult.then((result) => {
                if (result.isOk() && result.ok) {
                  throw result;
                } else {
                  return result;
                }
              }),
            ),
          )
            .then((results) => results[0] || Result.ok(false))
            .catch((result: Result<boolean, UnauthenticatedError>) => {
              if (result instanceof Result) {
                return result;
              } else {
                throw result;
              }
            }),
        );
  };
}
