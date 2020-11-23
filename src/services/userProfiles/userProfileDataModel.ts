import { RootTypingImport } from '@nexus/schema/dist/core';

export interface UserProfileDataModel {
  __typename: 'UserProfile';
  id: string;
  bio: string | null;
  userId: string;
}

export const userProfileDataModelRootTypingImport: RootTypingImport = {
  name: 'UserProfileDataModel',
  path: __filename,
};
