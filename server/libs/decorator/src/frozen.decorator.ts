// eslint-disable-next-line @typescript-eslint/ban-types
export function Frozen(target: Function): void {
  Object.freeze(target);
  Object.freeze(target.prototype);
}
