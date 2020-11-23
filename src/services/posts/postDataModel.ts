import { RootTypingImport } from '@nexus/schema/dist/core';
import { DateTime } from 'luxon';

export interface PostDataModel {
  __typename: 'Post';
  id: string;
  createdAt: DateTime;
  title: string;
  content: string;
  published: boolean;
  authorId: string;
  slug: string;
}

export const postDataModelRootTypingImport: RootTypingImport = {
  name: 'PostDataModel',
  path: __filename,
};
