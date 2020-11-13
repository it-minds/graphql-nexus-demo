export class NotFoundError {
  readonly __typename = 'NotFoundError' as const;
  readonly message: string;
  readonly id: string;

  constructor(id: string) {
    this.message = `Entity with id "${id}" not found.`;
    this.id = id;
  }
}
