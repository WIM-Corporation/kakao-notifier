import { ApiOffsetPageOkResponse, Auth, ReqUser } from '@libs/decorator';
import { OffsetPageDto } from '@libs/meta';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ChannelDto, ChannelService } from '../application';
import { GetChannelsDto } from '../infrastructure';
import { CreateChannelDto } from './dto';

@ApiTags('channel')
@Controller({ path: 'channels', version: ['1'] })
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @ApiOperation({ summary: '내 채널 목록 조회' })
  @ApiOffsetPageOkResponse({ type: ChannelDto })
  @HttpCode(HttpStatus.OK)
  @Auth()
  @Get('me')
  async getChannels(@ReqUser() user: Payload, @Query() getChannelsDto: GetChannelsDto): Promise<OffsetPageDto<ChannelDto>> {
    return await this.channelService.getChannels(user.id, getChannelsDto);
  }

  @ApiOperation({ summary: '채널 생성' })
  @HttpCode(HttpStatus.CREATED)
  @Auth()
  @Post()
  async createChannel(@ReqUser() user: Payload, @Body() { name }: CreateChannelDto): Promise<ChannelDto> {
    return await this.channelService.createChannel({ createdBy: user.id, name });
  }

  @ApiOperation({ summary: '채널 수정' })
  @HttpCode(HttpStatus.ACCEPTED)
  @Auth()
  @Patch(':id')
  async updateChannel(@ReqUser() user: Payload, @Param('id') id: string, @Body() { name }: CreateChannelDto): Promise<ChannelDto> {
    return await this.channelService.updateChannel(id, { name, userId: user.id });
  }

  @ApiOperation({ summary: '채널 삭제' })
  @HttpCode(HttpStatus.ACCEPTED)
  @Auth()
  @Delete(':id')
  async deleteChannel(@ReqUser() user: Payload, @Param('id') id: string): Promise<void> {
    await this.channelService.deleteChannel(id, user.id);
  }
}
