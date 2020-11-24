import { idArg, queryField } from '@nexus/schema';
import { UserResponse } from '../types/userResponse';

export const user = queryField((t) =>
  t.field('user', {
    type: UserResponse,
    nullable: false,
    args: {
      id: idArg({ required: true }),
    },
    resolve: (_, { id }, ctx) => ctx.users.getUserById(id).collect(),
  }),
);
