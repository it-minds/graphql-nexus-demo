import { objectType } from '@nexus/schema';

export const PageInfo = objectType({
  name: 'PageInfo',
  description: 'Information about the page layout of a related connection.',
  rootTyping: { name: 'PageInfo', path: __filename },
  definition(t) {
    t.string('endCursor', { nullable: true, resolve: (pageInfo) => pageInfo.endCursor ?? null });
    t.boolean('hasNextPage', { nullable: false, resolve: (pageInfo) => pageInfo.hasNextPage });
  },
});

export type PageInfo = {
  endCursor?: string | null;
  hasNextPage: boolean;
};
