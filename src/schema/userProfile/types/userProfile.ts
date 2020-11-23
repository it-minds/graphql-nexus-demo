import { objectType } from '@nexus/schema';
import { userProfileDataModelRootTypingImport } from '../../../services/userProfiles/userProfileDataModel';
import { UserResponse } from '../../user/types/userResponse';

export const UserProfile = objectType({
  name: 'UserProfile',
  description: 'Represents the profile of a user.',
  rootTyping: userProfileDataModelRootTypingImport,
  definition(t) {
    t.id('id', {
      description: 'The identifier for the user profile.',
      nullable: false,
      resolve: (userProfile) => userProfile.id,
    });
    t.string('bio', {
      nullable: true,
      description: 'A biography of the user.',
      resolve: (userProfile) => userProfile.bio,
    });
    t.field('user', {
      type: UserResponse,
      description: 'The user the profile belongs to.',
      nullable: false,
      resolve: (userProfile, _, ctx) => ctx.users.getUserById(userProfile.userId).collect(),
    });
  },
});
