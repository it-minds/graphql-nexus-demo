import { objectType } from '@nexus/schema';
import { Result } from '../../../result/result';
import { userDataModelRootTypingImport } from '../../../services/users/userDataModel';
import { toCollection } from '../../connection/createConnectionModels';
import { PostsConnectionResponse } from '../../post/types/postsConnectionResponse';
import { UserProfileResponse } from '../../userProfile/types/userProfileResponse';

export const User = objectType({
  name: 'User',
  rootTyping: userDataModelRootTypingImport,
  definition(t) {
    t.id('id', {
      description: 'The identifier of the user.',
      resolve: (user) => user.id,
      nullable: false,
    });
    t.string('name', {
      description: 'The name of the user.',
      resolve: (user) => user.name,
      nullable: true,
    });
    t.string('email', {
      description: 'The email of the user.',
      resolve: (user) => user.email,
      nullable: false,
    });
    t.field('profile', {
      type: UserProfileResponse,
      description: 'The author of the post',
      nullable: false,
      resolve: (user, _, ctx) => ctx.userProfiles.getUserProfileByUserId(user.id).collect(),
    });
    t.field('posts', {
      type: PostsConnectionResponse,
      description: 'The set of posts made by the user',
      nullable: false,
      resolve: (user, _, ctx) =>
        ctx.posts
          .getPostByAuthorId(user.id)
          .andThen((list) => Result.ok(toCollection(list, (node) => node.id, 'PostResponseConnection')))
          .collect(),
    });
  },
});
