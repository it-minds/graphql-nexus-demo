import { PrismaClient, Profile } from '@prisma/client';
import DataLoader from 'dataloader';
import { InvalidIdentifierError } from '../../error/invalidIdentifierError';
import { NotFoundError } from '../../error/notFoundError';
import { AsyncResult } from '../../result/asyncResult';
import { Result } from '../../result/result';
import { IdentifierService } from '../identifier/identifierService';
import { UserProfileDataModel } from './userProfileDataModel';

export class UserProfileService {
  private userProfiles: DataLoader<number, Result<UserProfileDataModel, NotFoundError>>;
  private userProfilesByUserId: DataLoader<number, Result<UserProfileDataModel, NotFoundError>>;
  private identifierService: IdentifierService;

  constructor(prisma: PrismaClient, identifierService: IdentifierService) {
    this.userProfiles = new DataLoader(async (keys) => {
      const userProfiles = await prisma.profile.findMany({
        where: { id: { in: [...keys] } },
        select: {
          id: true,
          bio: true,
          userId: true,
        },
      });
      return keys.map((key) => {
        const userProfile = userProfiles.find((userProfile) => userProfile.id === key);
        if (userProfile) {
          const result = Result.ok(this.transformUserProfile(userProfile));
          this.userProfilesByUserId.prime(userProfile.userId, result);
          return result;
        } else {
          return Result.error(new NotFoundError(this.identifierService.user.create(key)));
        }
      });
    });
    this.userProfilesByUserId = new DataLoader(async (keys) => {
      const userProfiles = await prisma.profile.findMany({
        where: { userId: { in: [...keys] } },
        select: {
          id: true,
          bio: true,
          userId: true,
        },
      });
      return keys.map((key) => {
        const userProfile = userProfiles.find((userProfile) => userProfile.id === key);
        if (userProfile) {
          const result = Result.ok(this.transformUserProfile(userProfile));
          this.userProfiles.prime(userProfile.id, result);
          return result;
        } else {
          return Result.error(new NotFoundError(this.identifierService.user.create(key)));
        }
      });
    });
    this.identifierService = identifierService;
  }

  getUserProfileById(id: string): AsyncResult<UserProfileDataModel, NotFoundError | InvalidIdentifierError> {
    return this.identifierService.userProfile
      .parse(id)
      .andThenAsync((profileId) => this.userProfiles.load(profileId.value));
  }

  getUserProfileByUserId(id: string): AsyncResult<UserProfileDataModel, NotFoundError | InvalidIdentifierError> {
    return this.identifierService.user.parse(id).andThenAsync((userId) => this.userProfilesByUserId.load(userId.value));
  }

  private transformUserProfile(userProfile: Profile): UserProfileDataModel {
    return {
      __typename: 'UserProfile',
      id: this.identifierService.userProfile.create(userProfile.id),
      bio: userProfile.bio,
      userId: this.identifierService.user.create(userProfile.userId),
    };
  }
}
