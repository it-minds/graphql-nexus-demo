import { Identifier } from '../identifier/identifier';
import { UserRole } from './userRole';

export interface AuthorizationIdentity {
  role: UserRole;
  userId: Identifier<'User'>;
}
