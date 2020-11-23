import { objectType } from '@nexus/schema';
import { PostDataModel } from '../../../services/posts/postDataModel';
import { Post } from './post';

export const CreatePost = objectType({
  name: 'CreatePost',
  rootTyping: { name: 'CreatePostRoot', path: __filename },
  definition(t) {
    t.field('post', {
      type: Post,
      description: 'The newly created post',
      nullable: false,
      resolve: (root) => root.post,
    });
  },
});

export type CreatePostRoot = { __typename: 'CreatePost'; post: PostDataModel };
