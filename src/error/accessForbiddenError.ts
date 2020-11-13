export class AccessForbiddenError {
  readonly __typename = 'AccessForbiddenError' as const;
  readonly message: string;

  constructor(message: string = 'Access Forbidden') {
    this.message = message;
  }
}
