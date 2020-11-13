import { Result } from './result';

export class AsyncResult<T, E> implements PromiseLike<Result<T, E>> {
  private innerResult: PromiseLike<Result<T, E>>;

  private constructor(result: PromiseLike<Result<T, E>>) {
    this.innerResult = result;
  }

  static from<T, E>(result: PromiseLike<Result<T, E>>): AsyncResult<T, E> {
    return new AsyncResult(result);
  }

  isOk(): PromiseLike<boolean> {
    return this.innerResult.then((result) => result.isOk());
  }

  isError(): PromiseLike<boolean> {
    return this.innerResult.then((result) => result.isError());
  }

  get ok(): PromiseLike<T> {
    return this.innerResult.then((result) => result.ok);
  }

  get error(): PromiseLike<E> {
    return this.innerResult.then((result) => result.error);
  }

  andThen<T2, E2>(f: (value: T) => Result<T2, E2>): AsyncResult<T2, E | E2> {
    return AsyncResult.from(
      this.innerResult.then((result) =>
        result.isOk() ? f(result.ok) : ((Result.error(result.error) as unknown) as Result<T2, E | E2>),
      ),
    );
  }

  andThenAsync<T2, E2>(f: (value: T) => PromiseLike<Result<T2, E2>>): AsyncResult<T2, E | E2> {
    return AsyncResult.from(
      this.innerResult.then((result) =>
        result.isOk() ? f(result.ok) : ((Result.error(result.error) as unknown) as Result<T2, E | E2>),
      ),
    );
  }

  collect(): PromiseLike<T | E> {
    return this.isOk().then<T | E>((result) => (result ? this.ok : this.error));
  }

  then<TResult1 = Result<T, E>, TResult2 = never>(
    onfulfilled?: ((value: Result<T, E>) => TResult1 | PromiseLike<TResult1>) | undefined | null,
    onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
  ): PromiseLike<TResult1 | TResult2> {
    return this.innerResult.then(onfulfilled, onrejected);
  }
}
