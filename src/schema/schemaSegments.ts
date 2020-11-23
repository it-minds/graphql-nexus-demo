import { ConnectionSchema } from './connection/schema';
import { ErrorSchema } from './error/schema';
import { PostSchema } from './post/schema';
import { UserSchema } from './user/schema';
import { UserProfileSchema } from './userProfile/schema';

export const schemaSegments = [ConnectionSchema, PostSchema, ErrorSchema, UserSchema, UserProfileSchema];
