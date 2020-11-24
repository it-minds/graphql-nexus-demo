import {
  NexusEnumTypeDef,
  NexusExtendTypeDef,
  NexusInterfaceTypeDef,
  NexusObjectTypeDef,
  NexusUnionTypeDef,
} from '@nexus/schema/dist/core';
import { connectionTypes } from './connection/schema';
import { errorTypes } from './error/schema';
import { postTypes } from './post/schema';
import { userTypes } from './user/schema';
import { userProfileTypes } from './userProfile/schema';

export const schemaTypes: Array<
  | NexusObjectTypeDef<any>
  | NexusUnionTypeDef<any>
  | NexusInterfaceTypeDef<any>
  | NexusEnumTypeDef<any>
  | NexusExtendTypeDef<any>
> = [connectionTypes, postTypes, errorTypes, userTypes, userProfileTypes].flat();
