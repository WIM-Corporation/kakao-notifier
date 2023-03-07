import { ChannelService } from '@api/modules/channel';
import { UserService } from '@api/modules/user';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { KakaoMemoFactory, KakaoMemoService } from '@wim-backend/kakao';
import { Message } from '../domain';
import { MessageCommandRepository, MessageQueryRepository } from '../infrastructure';
import { MessageDto, SendMessageDto } from './dto';

@Injectable()
export class MessageService {
  private readonly logger: Logger = new Logger(MessageService.name);
  constructor(
    private readonly query: MessageQueryRepository,
    private readonly command: MessageCommandRepository,
    private readonly userService: UserService,
    private readonly channelService: ChannelService,
    private readonly kakaoMemoService: KakaoMemoService,
    private readonly kakaoMemoFactory: KakaoMemoFactory,
  ) {}

  async getMessages(): Promise<any> {}

  async sendMessage(sendMessageDto: SendMessageDto): Promise<MessageDto> {
    const { channelId, type, templateObject } = sendMessageDto;

    const apiKey = await this.userService.getApiKey(sendMessageDto.apiKey);
    const user = await this.userService.getById(apiKey.user.id);

    await this.channelService.checkChannelOwner(channelId, apiKey.user.id);
    const memoObject = JSON.parse(templateObject);
    const memoTemplate = this.kakaoMemoFactory.create(type.toLowerCase() as 'feed' | 'list' | 'location' | 'commerce' | 'text', memoObject);
    await this.kakaoMemoService.sendMemoDefaultMessage(memoTemplate, user.accessToken);
    const message = Message.of(channelId, type, memoTemplate);
    await this.command.save(message);
    return MessageDto.from(message);
  }
}
