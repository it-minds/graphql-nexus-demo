import { schemaSegmentDeclaration } from '../schemaObjectTypeDeclaration';
import { UserProfile } from './types/userProfile';
import { UserProfileResponse } from './types/userProfileResponse';

export const UserProfileSchema = schemaSegmentDeclaration({ types: [UserProfile, UserProfileResponse] });
