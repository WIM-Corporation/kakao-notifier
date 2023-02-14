import { DatetimeToTimestampTransformer } from '@libs/transformer';
import { BeforeInsert, BeforeRemove, BeforeSoftRemove, BeforeUpdate, CreateDateColumn, DeleteDateColumn } from 'typeorm';

export interface BaseEntityProps {
  createdAt: number;
  deletedAt?: number;
}

export abstract class BaseEntity {
  id!: string;

  @CreateDateColumn({ comment: '생성일', width: 6, update: false, transformer: new DatetimeToTimestampTransformer() })
  createdAt!: number;

  @DeleteDateColumn({ comment: '삭제일', width: 6, nullable: true, transformer: new DatetimeToTimestampTransformer() })
  deletedAt!: number | null;

  @BeforeInsert()
  @BeforeUpdate()
  @BeforeSoftRemove()
  @BeforeRemove()
  validateEntity(): void {
    this.validate();
  }

  abstract validate(): void;
}
