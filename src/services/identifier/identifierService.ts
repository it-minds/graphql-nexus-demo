import { InvalidIdentifierError } from '../../error/invalidIdentifierError';
import { Result } from '../../result/result';
import { Identifier } from './identifier';

const idMatcher = /(\w+)\/(0|[1-9][0-9]*)/;

export class IdentifierService {
  parse(id: string): Result<Identifier<any>, InvalidIdentifierError> {
    const idMatch = idMatcher.exec(id);
    return idMatch
      ? Result.ok(new Identifier(idMatch[1], parseInt(idMatch[2], 10)))
      : Result.error(new InvalidIdentifierError(id));
  }

  post = new IdentifierClass('Post');
  postComment = new IdentifierClass('PostComment');
  user = new IdentifierClass('User');
}

class IdentifierClass<Prefix extends string> {
  private prefix: Prefix;

  constructor(prefix: Prefix) {
    this.prefix = prefix;
  }

  create(id: number): string {
    return `${this.prefix}/${id}`;
  }

  parse(id: string): Result<Identifier<Prefix>, InvalidIdentifierError> {
    const idMatch = idMatcher.exec(id);
    return idMatch && idMatch[1] === this.prefix
      ? Result.ok(new Identifier(this.prefix, parseInt(idMatch[2], 10)))
      : Result.error(new InvalidIdentifierError(id));
  }
}
