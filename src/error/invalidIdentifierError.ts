export class InvalidIdentifierError {
  readonly __typename = 'InvalidIdentifierError' as const;
  readonly message: string;
  readonly id: string;

  constructor(id: string) {
    this.message = `Invalid identifier "${id}"`;
    this.id = id;
  }
}
