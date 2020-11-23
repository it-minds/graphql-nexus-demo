import { idArg } from '@nexus/schema';
import { schemaSegmentDeclaration } from '../schemaObjectTypeDeclaration';
import { User } from './types/user';
import { UserResponse } from './types/userResponse';

export const UserSchema = schemaSegmentDeclaration({
  query: (t) => {
    t.field('user', {
      type: UserResponse,
      nullable: false,
      args: {
        id: idArg({ required: true }),
      },
      resolve: (root, { id }, ctx) => ctx.users.getUserById(id).collect(),
    });
  },
  types: [User, UserResponse],
});
