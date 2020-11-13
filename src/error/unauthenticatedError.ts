export class UnauthenticatedError {
  readonly __typename = 'UnauthenticatedError' as const;
  readonly message: string;

  constructor(message: string = 'Unauthenticated') {
    this.message = message;
  }
}
