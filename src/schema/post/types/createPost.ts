import { objectType } from '@nexus/schema';
import { PostDataModel } from '../../../models/postDataModel';
import { Post } from './post';

export const CreatePost = objectType({
  name: 'CreatePost',
  rootTyping: { name: 'CreatePostRoot', path: __filename },
  definition(t) {
    t.field('post', {
      type: Post,
      description: 'The newly created post',
      nullable: false,
      resolve: (root, args, ctx) => root.post,
    });
  },
});

export type CreatePostRoot = { __typename: 'CreatePost'; post: PostDataModel };
