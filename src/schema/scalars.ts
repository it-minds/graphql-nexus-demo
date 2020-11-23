import { scalarType } from '@nexus/schema';
import { DateTime } from 'luxon';

export const DateTimeScalar = scalarType({
  name: 'DateTime',
  serialize: (value: DateTime) => value.toISO(),
  parseValue: (value: string) => DateTime.fromISO(value),
  parseLiteral: (ast) => (ast.kind === 'StringValue' ? DateTime.fromISO(ast.value) : null),
  asNexusMethod: 'dateTime',
  description: 'DateTime scalar type',
  rootTyping: { path: 'luxon', name: 'DateTime' },
});

export const scalars = [DateTimeScalar];
