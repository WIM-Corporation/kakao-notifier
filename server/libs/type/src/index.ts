/* eslint-disable @typescript-eslint/ban-types */
export type Constructor<T, Arguments extends unknown[] = undefined[]> = new (...args: Arguments) => T;
export type Flatten<T> = T extends unknown[] ? T[number] : T extends object ? T[keyof T] : never;
export type InstanceType<T extends new (...args: any) => any> = T extends new (...args: any) => infer R ? R : never;

export type KeyOfType<Entity, U> = {
  [P in keyof Required<Entity>]: Required<Entity>[P] extends U ? P : Required<Entity>[P] extends U[] ? P : never;
}[keyof Entity];

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

/**
 * Exclude all function properties from type.
 */
export type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

/**
 * Interface of the simple literal object with any string keys.
 */
export type ObjectLiteral = Record<string, unknown>;

/**
 * Makes an interface with all optional values to require AT LEAST one of them.
 */
export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

/* Makes an interface with all optional values to accept ONLY one of them */
export type RequireOnlyOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Record<Exclude<Keys, K>, undefined>>;
  }[Keys];
