import { RootTypingImport } from '@nexus/schema/dist/core';

export interface UserDataModel {
  __typename: 'User';
  id: string;
  email: string;
  name: string | null;
  password: string | null;
}

export const userDataModelRootTypingImport: RootTypingImport = {
  name: 'UserDataModel',
  path: __filename,
};
