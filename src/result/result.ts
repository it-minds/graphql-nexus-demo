import { AsyncResult } from './asyncResult';

export class Result<T, E> {
  private readonly _isOk: boolean;
  private readonly _ok?: T;
  private readonly _error?: E;

  private constructor(isOk: boolean, ok?: T, error?: E) {
    this._isOk = isOk;
    this._ok = ok;
    this._error = error;
  }

  static ok<T = never, E = never>(result?: T): Result<T, E> {
    return new Result<T, E>(true, result, undefined);
  }

  static error<T = never, E = never>(error: E): Result<T, E> {
    return new Result<T, E>(false, undefined, error);
  }

  isOk(): boolean {
    return this._isOk;
  }

  isError(): boolean {
    return !this._isOk;
  }

  get ok(): T {
    if (!this._isOk) {
      throw new Error('Attempted to retrieve ok value from error Result');
    }
    return this._ok as T;
  }

  get error(): E {
    if (this._isOk) {
      throw new Error('Attempted to retrieve error value from ok Result');
    }
    return this._error as E;
  }

  andThen<T2, E2>(f: (value: T) => Result<T2, E2>): Result<T2, E | E2> {
    return this._isOk ? f(this._ok as T) : ((this as unknown) as Result<T2, E | E2>);
  }

  andThenAsync<T2, E2>(f: (value: T) => PromiseLike<Result<T2, E2>>): AsyncResult<T2, E | E2> {
    return AsyncResult.from(this._isOk ? f(this._ok as T) : Promise.resolve((this as unknown) as Result<T2, E | E2>));
  }
}
