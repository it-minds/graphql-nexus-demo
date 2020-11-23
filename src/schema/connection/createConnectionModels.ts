import { objectType } from '@nexus/schema';
import { NexusObjectTypeDef, NexusUnionTypeDef, ObjectDefinitionBlock, RootTypingImport } from '@nexus/schema/dist/core';
import { PageInfo } from './pageInfo';

export function createConnectionModels<Type extends NexusUnionTypeDef<any> | NexusObjectTypeDef<any>>(config: {
  type: Type,
  connection: {
    rootTyping: RootTypingImport,
    additionalFields?: (t: ObjectDefinitionBlock<`${Type extends NexusUnionTypeDef<infer Name> ? Name : Type extends NexusObjectTypeDef<infer Name> ? Name : never}Connection`>) => void,
  },
  edge: {
    rootTyping: RootTypingImport,
    additionalFields?: (t: ObjectDefinitionBlock<`${Type extends NexusUnionTypeDef<infer Name> ? Name : Type extends NexusObjectTypeDef<infer Name> ? Name : never}ConnectionEdge`>) => void,
  }
}) {
  const edge = objectType<`${Type extends NexusUnionTypeDef<infer Name> ? Name : Type extends NexusObjectTypeDef<infer Name> ? Name : never }ConnectionEdge`>({
    name: `${config.type.name}ConnectionEdge` as `${Type extends NexusUnionTypeDef<infer Name> ? Name : Type extends NexusObjectTypeDef<infer Name> ? Name : never }ConnectionEdge`,
    rootTyping: config.edge.rootTyping,
    definition(t) {
      t.field('cursor', { type: 'String', nullable: false, resolve: (edge: Connection<any, any>['edges'][0]) => edge.cursor, } as any);
      t.field('node', { type: config.type, resolve: (edge: Connection<any, any>['edges'][0]) => edge.node, nullable: false } as any);
      config.edge.additionalFields?.(t);
    },
  });
  const connection = objectType<`${Type extends NexusUnionTypeDef<infer Name> ? Name : Type extends NexusObjectTypeDef<infer Name> ? Name : never }Connection`>({
    name: `${config.type.name}Connection` as `${Type extends NexusUnionTypeDef<infer Name> ? Name : Type extends NexusObjectTypeDef<infer Name> ? Name : never }Connection`,
    rootTyping: config.connection.rootTyping,
    definition(t) {
      t.field('edges', {
        type: edge,
        list: true,
        nullable: false,
        description: 'The list of items in the connection',
        resolve: (connection: Connection<any, any>) => connection.edges,
      } as any);
      t.field('pageInfo', { type: PageInfo, nullable: false, resolve: (connection: Connection<any, any>) => connection.pageInfo } as any);
      config.connection.additionalFields?.(t);
    },
  });
  return {
    connection,
    edge,
  };
}

export type Connection<TypeName extends string, Type> = {
  __typename: TypeName;
  edges: Array<{ cursor: string, node: Type }>,
  pageInfo: PageInfo
};

export function toCollection<TypeName extends string, Type>(list: Type[], getCursor: (node: Type) => string, __typename: TypeName): Connection<TypeName, Type> {
  return {
    __typename,
    edges: list.map(node => ({ cursor: getCursor(node), node })),
    pageInfo: {
      hasNextPage: false,
      endCursor: list.length > 0 ? getCursor(list[list.length - 1]) : null,
    }
  }
}