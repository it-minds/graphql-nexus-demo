import { PrismaClient } from '@prisma/client';
import { GraphQLServer } from 'graphql-yoga';
import { DateTime } from 'luxon';
import { prepareConfig } from './config/prepareConfig';
import { RequestContext } from './schema/context';
import { schema } from './schema/schema';
import { AuthorizationService } from './services/authorization/authorizationService';
import { IdentifierService } from './services/identifier/identifierService';
import { PostsService } from './services/posts/postsService';
import { UserProfileService } from './services/userProfiles/userProfileService';
import { UsersService } from './services/users/userService';

const config = prepareConfig();

const server = new GraphQLServer({
  schema: schema as any /** TODO: fix, Graphql-yoga hasn't been updated to work correctly with graphql v^15.0.0  */,
  context: (params): RequestContext => {
    const prisma = new PrismaClient();
    const identifierService = new IdentifierService();
    const now = DateTime.utc();
    const authorizationToken = params.request.headers.authorization;
    return {
      authorization: new AuthorizationService(authorizationToken, now, config.jwtSecret, identifierService),
      posts: new PostsService(prisma, identifierService, now),
      users: new UsersService(prisma, identifierService),
      userProfiles: new UserProfileService(prisma, identifierService),
    };
  },
});

server.start(() => console.log('Server is running on http://localhost:4000'));
