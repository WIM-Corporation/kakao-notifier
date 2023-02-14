import { NotFoundException } from '@nestjs/common';

export class Dictionary<K, V> extends Map<K, V> {
  override get(key: K): V {
    const value = super.get(key);
    if (!value) throw new NotFoundException('데이터가 없습니다.');
    return value;
  }

  find(key: K | undefined | null): V | undefined {
    if (key === undefined || key === null) return undefined;
    return super.get(key);
  }

  toArray(): V[] {
    return [...this.values()];
  }
}
