export function Final<T extends { new (...args: any[]): object }>(target: T): T {
  return class FinalClass extends target {
    constructor(...args: any[]) {
      if (new.target !== FinalClass) {
        throw new Error('Cannot inherit from final class');
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      super(...args);
    }
  };
}
