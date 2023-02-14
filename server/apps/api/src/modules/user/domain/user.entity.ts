import { BaseEntity } from '@libs/base';
import { ERole } from '@libs/constant';
import { DatetimeToTimestampTransformer } from '@libs/transformer';
import { Column, Entity, Index, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { v4 } from 'uuid';
import { ERoleTransformer } from './transformer';

@Index(['displayName', 'avatar', 'role', 'deletedAt'])
@Entity('user')
export class User extends BaseEntity {
  @PrimaryColumn({ length: 21 })
  override id!: string;

  @Column('varchar', { length: 30, unique: true })
  displayName!: string;

  @Column('enum', { enum: ERole.values(), transformer: new ERoleTransformer() })
  role!: ERole;

  @Column('varchar', { nullable: true, length: 500 })
  avatar?: string;

  @UpdateDateColumn({ comment: '수정일', width: 6, nullable: true, transformer: new DatetimeToTimestampTransformer() })
  updatedAt!: number | null;

  validate(): void {}

  static create({ displayName, role, avatar }: { displayName: string; role: ERole; avatar?: string }): User {
    const user = new User();
    user.id = v4();
    user.displayName = displayName;
    user.role = role;
    user.avatar = avatar;
    return user;
  }
}
