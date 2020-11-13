import { interfaceType } from '@nexus/schema';

export const GraphQLError = interfaceType({
  name: 'Error',
  description: 'Represents an error',
  definition(t) {
    t.string('description', { resolve: (root) => root.message });
    t.resolveType((source) => source.__typename);
  },
});
