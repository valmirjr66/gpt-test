import { Injectable } from '@nestjs/common';
import ConversationDto from 'src/dto/ConversationDto';
import GptResponseDto from 'src/dto/GptResponseDto';
import InsertMessageRequestDto from 'src/dto/InsertMessageRequestDto';
import MessageDto from 'src/dto/MessageDto';
import DeliveryChatAgent from 'src/gpt/DeliveryChatAgent';
import ImageAgent from 'src/gpt/ImageAgent';
import MessageRepository from 'src/repository/MessageRepository';

@Injectable()
export default class GptService {
  constructor(
    private readonly deliveryChatAgent: DeliveryChatAgent,
    private readonly messageRepository: MessageRepository,
    private readonly imageAgent: ImageAgent,
  ) {}

  async getConversationById(id: string): Promise<ConversationDto> {
    const conversationMessages: MessageDto[] =
      await this.messageRepository.getMessagesByConversation(id);

    const conversation = new ConversationDto(id, conversationMessages);

    return conversation;
  }

  async sendMessage(message: InsertMessageRequestDto): Promise<GptResponseDto> {
    const conversationMessages: MessageDto[] =
      await this.messageRepository.getMessagesByConversation(
        message.conversationId,
      );

    const newMessage = await this.messageRepository.insertMessage(message);

    conversationMessages.push(newMessage);

    const conversation = new ConversationDto(
      message.conversationId,
      conversationMessages,
    );

    const response =
      await this.deliveryChatAgent.createCompletion(conversation);

    await this.messageRepository.insertMessage({
      content: response,
      role: 'assistant',
      conversationId: message.conversationId,
    });

    const dto = new GptResponseDto();
    dto.content = response;

    return dto;
  }

  async generateImage(prompt: string): Promise<GptResponseDto> {
    const response = await this.imageAgent.generate(prompt);
    const dto = new GptResponseDto();
    dto.content = response;

    return dto;
  }
}
