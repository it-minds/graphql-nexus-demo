import { AuthorizationService } from '../services/authorization/authorizationService';
import { PostsService } from '../services/posts/postsService';
import { UserProfileService } from '../services/userProfiles/userProfileService';
import { UsersService } from '../services/users/userService';

// NOTE: if this file is moved or the RequestContext interface is renamed the change should be reflected in the ./src/schema/schema.ts file
export interface RequestContext {
  posts: PostsService;
  users: UsersService;
  userProfiles: UserProfileService;
  authorization: AuthorizationService;
}
