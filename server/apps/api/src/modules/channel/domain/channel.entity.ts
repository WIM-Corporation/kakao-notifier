import { BaseEntity } from '@libs/base';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index(['createdBy', 'name', 'deletedAt'])
@Entity('channel')
export class Channel extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  override id!: string;

  @Column('bigint')
  createdBy!: string;

  @Column('varchar', { length: 20 })
  name!: string;

  validate(): void {}

  static from({ createdBy, name }: { createdBy: string; name: string }): Channel {
    const channel = new Channel();
    channel.createdBy = createdBy;
    channel.name = name;
    return channel;
  }

  fixName({ userId, name }: { userId: string; name: string }): void {
    if (this.createdBy !== userId) throw new Error('채널 이름을 수정할 권한이 없습니다.');
    this.name = name;
  }

  delete(userId: string): void {
    if (this.createdBy !== userId) throw new Error('채널을 삭제할 권한이 없습니다.');
    this.deletedAt = +new Date();
  }
}
