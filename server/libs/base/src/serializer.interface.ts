export interface ISerializer {
  serialize(instance: any): void;
  deserialize(literal: any): void;
}
