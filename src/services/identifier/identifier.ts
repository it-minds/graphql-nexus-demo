export class Identifier {
  readonly prefix: string;
  readonly id: number;

  constructor(prefix: string, id: number) {
    this.prefix = prefix;
    this.id = id;
  }

  toString(): string {
    return `${this.prefix}/${this.id}`;
  }
}
