import { objectType } from '@nexus/schema';
import { postDataModelRootTypingImport } from '../../../services/posts/postDataModel';
import { UserResponse } from '../../user/types/userResponse';

export const Post = objectType({
  name: 'Post',
  rootTyping: postDataModelRootTypingImport,
  definition(t) {
    t.id('id', {
      description: 'The identifier of the post.',
      resolve: (post) => post.id,
      nullable: false,
    });
    t.string('title', {
      description: 'The title of the post.',
      resolve: (post) => post.title,
      nullable: false,
    });
    t.string('slug', {
      description: 'The slug assigned to the post.',
      resolve: (post) => post.slug,
      nullable: false,
    });
    t.boolean('isPublished', {
      description: 'Has the post been published?',
      resolve: (post) => post.published,
      nullable: false,
    });
    t.dateTime('createdAt', {
      description: 'When was this post created?',
      resolve: (post) => post.createdAt,
      nullable: false,
    });
    t.string('content', {
      description: 'The content text of the post.',
      nullable: false,
      resolve: (post) => post.content,
    });
    t.field('author', {
      type: UserResponse,
      description: 'The author of the post',
      nullable: false,
      resolve: (post, _, ctx) => ctx.users.getUserById(post.authorId).collect(),
    });
  },
});
