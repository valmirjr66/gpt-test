import { Module } from '@nestjs/common';
import BlobManager from './blob/BlobManager';
import GptController from './controller/GptController';
import ChatAgent from './gpt/DeliveryChatAgent';
import ImageAgent from './gpt/ImageAgent';
import MessageRepository from './repository/MessageRepository';
import GptService from './service/GptService';

@Module({
  imports: [],
  controllers: [GptController],
  providers: [
    MessageRepository,
    BlobManager,
    GptService,
    ChatAgent,
    ImageAgent,
  ],
})
export class AppModule {}
