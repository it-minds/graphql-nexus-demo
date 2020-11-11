export class InvalidIdentifierError extends Error {
  readonly kind = "InvalidIdentifierError" as const;

  readonly id: string;

  constructor(id: string) {
    super(`Invalid identifier "${id}"`);
    this.id = id;
  }
}
