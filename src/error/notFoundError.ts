export class NotFoundError extends Error {
  readonly kind = "NotFoundError" as const;

  readonly id: string;

  constructor(id: string) {
    super(`Entity with id "${id}" not found.`);
    this.id = id;
  }
}
