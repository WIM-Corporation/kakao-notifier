import { UserService } from '@api/modules/user';
import { ApiOffsetPageOkResponse, Auth, ReqUser } from '@libs/decorator';
import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MessageDto, MessageService, SendMessageDto } from '../application';

@ApiTags('message')
@Controller({ path: 'messages', version: ['1'] })
export class MessageController {
  constructor(private readonly messageService: MessageService, private readonly userService: UserService) {}

  @ApiOperation({ summary: '메시지 목록 조회' })
  @ApiOffsetPageOkResponse({ type: MessageDto })
  @HttpCode(HttpStatus.OK)
  @Auth()
  @Get()
  async getMessages(): Promise<any> {}

  @ApiOperation({ summary: '메시지 발송' })
  @ApiOkResponse({ type: MessageDto })
  @HttpCode(HttpStatus.OK)
  @Auth({ public: true })
  @Post()
  async sendMessage(@Body() sendMessageDto: SendMessageDto): Promise<MessageDto> {
    return await this.messageService.sendMessage(sendMessageDto);
  }
}
