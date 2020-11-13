import { DateTime } from 'luxon';
import { Result } from '../../result/result';
import * as jwt from 'jsonwebtoken';
import { UnauthenticatedError } from '../../error/unauthenticatedError';
import { IdentifierService } from '../identifier/identifierService';
import { Identifier } from '../identifier/identifier';
import { AuthorizationIdentity } from './authorizationIdentity';
import { UserRole } from './userRole';

export class AuthorizationService {
  private authorizationToken: string | undefined;
  private now: DateTime;
  private jwtSecret: string;
  private identifierService: IdentifierService;
  private decodedToken?: Result<AuthorizationIdentity, UnauthenticatedError>;

  constructor(
    authorizationToken: string | undefined,
    now: DateTime,
    jwtSecret: string,
    identifierService: IdentifierService,
  ) {
    this.authorizationToken = authorizationToken;
    this.now = now;
    this.jwtSecret = jwtSecret;
    this.identifierService = identifierService;
  }

  get currentIdentity(): Result<AuthorizationIdentity, UnauthenticatedError> {
    if (!this.decodedToken) {
      if (this.authorizationToken === undefined) {
        return Result.error(new UnauthenticatedError());
      } else {
        try {
          const decoded = jwt.verify(this.authorizationToken, this.jwtSecret, {
            clockTimestamp: this.now.toSeconds(),
          });
          return this.isAuthorizationTokenContents(decoded)
            ? Result.ok({
                userId: this.identifierService.user.parse(decoded.userId).ok,
                role: decoded.role,
              })
            : Result.error(new UnauthenticatedError());
        } catch (e) {
          return Result.error(new UnauthenticatedError());
        }
      }
    }
    return this.decodedToken;
  }

  get userId(): Result<Identifier<'User'>, UnauthenticatedError> {
    return this.currentIdentity.andThen(({ userId }) => Result.ok(userId));
  }

  private isAuthorizationTokenContents(obj: unknown): obj is AuthorizationTokenContents {
    const token = obj as AuthorizationTokenContents;
    return (
      typeof obj === 'object' &&
      typeof token.userId === 'string' &&
      this.identifierService.user.parse(token.userId).isOk() &&
      typeof token.role === 'string' &&
      Object.keys(UserRole).includes(token.role)
    );
  }
}

interface AuthorizationTokenContents {
  userId: string;
  role: UserRole;
}
