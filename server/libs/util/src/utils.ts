import { ArgumentInvalidException } from '@libs/exception';
import { intersection, toInteger, union, zip } from 'lodash';
import { RedisOptions } from 'ioredis';
import { Dictionary } from './dictionary';

export function zipNotEmpty<A, B>(a: A[], b: B[]): Array<[A, B]> {
  if (a.length !== b.length) throw new ArgumentInvalidException('합칠 배열의 크기가 일치하지 않습니다.');
  return zip(a, b).map((v) => {
    if (!v[0] || !v[1]) throw new ArgumentInvalidException('정의되지 않은 인자가 존재합니다.');
    return [v[0], v[1]];
  });
}

export function toKeyDictionary<T, K extends keyof T>(values: T[], pick: K): Dictionary<T[K], T> {
  return new Dictionary(values.map((v) => [v[pick], v]));
}

export function jaccard(arr1: number[], arr2: number[]): number {
  const intersections = intersection(arr1, arr2);
  const unions = union(arr1, arr2);
  if (!unions.length) return 0;
  return intersections.length / unions.length;
}

/**
 * @description ioRedis 옵션을 url로 바꿔 리턴한다.
 */
export function redisOptionToUrl(options: Pick<RedisOptions, 'host' | 'port' | 'password' | 'db' | 'username'>): string {
  const { host, port, db, username, password } = options;

  let url = 'redis://';
  if (username) url += username;
  if (password) url += `:${password}`;
  if (username || password) url += '@';
  url += host ?? '127.0.0.1';
  url += `:${port ?? '6379'}`;
  if (db) url += `/${db}`;

  return url;
}

export function msToSecond(ms: number): number {
  return toInteger(ms / 1000);
}
