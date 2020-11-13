import { objectType } from '@nexus/schema';
import { postDataModelRootTypingImport } from '../../../models/postDataModel';

export const Post = objectType({
  name: 'Post',
  rootTyping: postDataModelRootTypingImport,
  definition(t) {
    t.string('title', {
      description: 'The title of the post',
    });
  },
});
