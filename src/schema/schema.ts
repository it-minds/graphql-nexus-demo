import { makeSchema, mutationType, queryType } from '@nexus/schema';
import * as path from 'path';
import { schemaSegments } from './schemaSegments';

export const schema = makeSchema({
  types: [
    ...schemaSegments.flatMap((segment) => segment.types || []),
    queryType({
      definition(t) {
        for (const segment of schemaSegments) {
          segment.query?.(t);
        }
      },
    }),
    mutationType({
      definition(t) {
        for (const segment of schemaSegments) {
          segment.mutation?.(t);
        }
      },
    }),
  ],
  outputs: {
    schema: path.resolve('./src/generated/schema.graphql'), // where to save the schema declaration artifact
    typegen: path.resolve('./src/generated/typings.ts'), // where to save the typescript schema definitions artifact
  },
  typegenAutoConfig: {
    sources: [
      {
        source: path.resolve(__dirname, './context.ts'), // this points to where the RequestContext type can be imported from
        alias: 'ctx', // the alias the module containing the RequestContext type is given in the schema typeings artifact
      },
    ],
    contextType: 'ctx.RequestContext', // the path to the RequestContext in the typeings artifact
  },
  shouldExitAfterGenerateArtifacts: process.argv.includes('--nexus-exit'), // if the --nexus-exit param is given to the process, exit after the schema artifacts have been generated
});
