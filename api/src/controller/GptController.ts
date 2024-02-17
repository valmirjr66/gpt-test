import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import ResponseDescriptions from 'src/constants/ResponseDescriptions';
import GptResponseDto from 'src/dto/GptResponseDto';
import GptService from 'src/service/GptService';
import BaseController from './BaseController';
import InsertMessageRequestDto from 'src/dto/InsertMessageRequestDto';
import ConversationDto from 'src/dto/ConversationDto';

@ApiTags('GPT')
@Controller('gpt')
export default class GptController extends BaseController {
  constructor(private readonly gptService: GptService) {
    super();
  }

  @Get('/chat/:id')
  @ApiOkResponse({ description: ResponseDescriptions.OK })
  @ApiNotFoundResponse({ description: ResponseDescriptions.NOT_FOUND })
  @ApiInternalServerErrorResponse({
    description: ResponseDescriptions.INTERNAL_SERVER_ERROR,
  })
  async getConversationById(@Param('id') id: string): Promise<ConversationDto> {
    const response = await this.gptService.getConversationById(id);
    this.validateGetResponse(response);
    return response;
  }

  @Post('/chat/message')
  @ApiOkResponse({ description: ResponseDescriptions.OK })
  @ApiNotFoundResponse({ description: ResponseDescriptions.NOT_FOUND })
  @ApiInternalServerErrorResponse({
    description: ResponseDescriptions.INTERNAL_SERVER_ERROR,
  })
  async insertMessage(
    @Body() message: InsertMessageRequestDto,
  ): Promise<GptResponseDto> {
    const response = await this.gptService.sendMessage(message);
    return response;
  }

  @Post('/image/:prompt')
  @ApiOkResponse({ description: ResponseDescriptions.OK })
  @ApiNotFoundResponse({ description: ResponseDescriptions.NOT_FOUND })
  @ApiInternalServerErrorResponse({
    description: ResponseDescriptions.INTERNAL_SERVER_ERROR,
  })
  async generateImage(
    @Param('prompt') prompt: string,
  ): Promise<GptResponseDto> {
    const response = await this.gptService.generateImage(prompt);
    return response;
  }
}
