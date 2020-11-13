export class Identifier<Prefix extends string> {
  readonly prefix: Prefix;
  readonly value: number;

  constructor(prefix: Prefix, id: number) {
    this.prefix = prefix;
    this.value = id;
  }

  toString(): string {
    return `${this.prefix}/${this.value}`;
  }
}
