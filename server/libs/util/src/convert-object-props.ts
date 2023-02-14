export function excludeKeyOfSchema<T extends object, K extends keyof T>(schema: T, keys: readonly K[]): Omit<T, typeof keys[number]> {
  const targetSchema = { ...schema };
  keys.forEach((v: keyof T) => {
    delete targetSchema[v];
  });
  return targetSchema;
}

export function removeUndefinedProps(item: any): any {
  const filtered: any = {};
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  for (const key of Object.keys(item)) {
    if (item[key]) filtered[key] = item[key];
  }
  return filtered;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function deepFreeze(object: any) {
  const propNames = Object.getOwnPropertyNames(object);

  for (const name of propNames) {
    const value = object[name];

    if (value && typeof value === 'object') {
      deepFreeze(value);
    }
  }

  return Object.freeze(object);
}
