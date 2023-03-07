import { BaseEntity } from '@libs/base';
import { MemoTemplate } from '@wim-backend/kakao/dist/memo/interface/common';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { MessageType } from './message-type.enum';

@Index(['channelId', 'type', 'deletedAt'])
@Entity('message')
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  override id!: string;

  @Column('uuid')
  channelId!: string;

  @Column({ type: 'enum', enum: MessageType })
  type!: MessageType;

  @Column({ type: 'json' })
  content!: MemoTemplate;

  validate(): void {}

  static of(channelId: string, type: MessageType, template: MemoTemplate): Message {
    const message = new Message();
    message.channelId = channelId;
    message.type = type;
    message.content = template;
    return message;
  }
}
