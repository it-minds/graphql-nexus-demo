import { DateTime } from "luxon";
import { Result } from "../../result/result";
import * as jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../../error/unauthenticatedError";
import { IdentifierService } from "../identifier/identifierService";

export class AuthorizationService {
  private authorizationToken: string | undefined;
  private now: DateTime;
  private jwtSecret: string;
  private identifierService: IdentifierService;

  constructor(
    authorizationToken: string | undefined,
    now: DateTime,
    jwtSecret: string,
    identifierService: IdentifierService
  ) {
    this.authorizationToken = authorizationToken;
    this.now = now;
    this.jwtSecret = jwtSecret;
    this.identifierService = identifierService;
  }

  get userId(): Result<string, UnauthenticatedError> {
    return this.decodedToken.andThen(({ userId }) => Result.ok(userId));
  }

  private get decodedToken(): Result<{ userId: string }, UnauthenticatedError> {
    if (this.authorizationToken === undefined) {
      return Result.error(new UnauthenticatedError());
    } else {
      try {
        const decoded = jwt.verify(this.authorizationToken, this.jwtSecret, {
          clockTimestamp: this.now.toSeconds(),
        });
        return this.isAuthorization(decoded)
          ? Result.ok(decoded)
          : Result.error(new UnauthenticatedError());
      } catch (e) {
        return Result.error(new UnauthenticatedError());
      }
    }
  }

  private isAuthorization(obj: unknown): obj is Authorization {
    return (
      typeof obj === "object" &&
      typeof (obj as Authorization).userId === "string" &&
      this.identifierService.user.parse((obj as Authorization).userId).isOk()
    );
  }
}

interface Authorization {
  userId: string;
}
