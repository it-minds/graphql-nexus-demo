import { PrismaClient, User } from '@prisma/client';
import DataLoader from 'dataloader';
import { InvalidIdentifierError } from '../../error/invalidIdentifierError';
import { NotFoundError } from '../../error/notFoundError';
import { AsyncResult } from '../../result/asyncResult';
import { Result } from '../../result/result';
import { IdentifierService } from '../identifier/identifierService';
import { UserDataModel } from './userDataModel';

export class UsersService {
  private users: DataLoader<number, Result<UserDataModel, NotFoundError>>;
  private identifierService: IdentifierService;

  constructor(prisma: PrismaClient, identifierService: IdentifierService) {
    this.users = new DataLoader(async (keys) => {
      const users = await prisma.user.findMany({
        where: { id: { in: [...keys] } },
        select: {
          id: true,
          name: true,
          email: true,
          password: true,
        },
      });
      return keys.map((key) => {
        const user = users.find((user) => user.id === key);
        return user
          ? Result.ok(this.transformUser(user))
          : Result.error(new NotFoundError(this.identifierService.user.create(key)));
      });
    });
    this.identifierService = identifierService;
  }

  getUserById(id: string): AsyncResult<UserDataModel, NotFoundError | InvalidIdentifierError> {
    return this.identifierService.user.parse(id).andThenAsync((id) => this.users.load(id.value));
  }

  private transformUser(user: User): UserDataModel {
    return {
      __typename: 'User',
      id: this.identifierService.user.create(user.id),
      email: user.email,
      name: user.name,
      password: user.password,
    };
  }
}
