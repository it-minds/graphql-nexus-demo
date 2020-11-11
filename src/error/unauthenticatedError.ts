export class UnauthenticatedError extends Error {
  readonly kind = "UnauthenticatedError" as const;

  constructor(message: string = "Unauthenticated") {
    super("Unauthenticated");
  }
}
