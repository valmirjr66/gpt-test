import { Injectable } from '@nestjs/common';
import { SPANISH_COURSE } from 'src/constants/GptSetup';
import ConversationDto from 'src/dto/ConversationDto';
import GptResponseDto from 'src/dto/GptResponseDto';
import InsertMessageRequestDto from 'src/dto/InsertMessageRequestDto';
import MessageDto from 'src/dto/MessageDto';
import ChatAgent from 'src/gpt/ChatAgent';
import ImageAgent from 'src/gpt/ImageAgent';
import InsertMessageRequestModel from 'src/model/InsertMessageRequestModel';
import MessageRepository from 'src/repository/MessageRepository';

@Injectable()
export default class GptService {
  private readonly chatAgent: ChatAgent;
  private readonly imageAgent: ImageAgent;

  constructor(private readonly messageRepository: MessageRepository) {
    this.chatAgent = new ChatAgent(SPANISH_COURSE);
    this.imageAgent = new ImageAgent();
  }

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

    const newMessage = await this.messageRepository.insertMessage(
      new InsertMessageRequestModel(
        'user',
        message.content,
        message.conversationId,
      ),
    );

    conversationMessages.push(newMessage);

    const conversation = new ConversationDto(
      message.conversationId,
      conversationMessages,
    );

    const response = await this.chatAgent.createCompletion(conversation);

    await this.messageRepository.insertMessage({
      content: response,
      role: 'assistant',
      conversationId: message.conversationId,
    });

    return new GptResponseDto(response);
  }

  async generateImage(prompt: string): Promise<GptResponseDto> {
    const response = await this.imageAgent.generate(prompt);
    return new GptResponseDto(response);
  }
}
