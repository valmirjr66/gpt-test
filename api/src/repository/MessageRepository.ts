import { Injectable } from '@nestjs/common';
import BaseRepository from './BaseRepository';
import InsertMessageRequestDto from 'src/dto/InsertMessageRequestDto';
import MessageModel from 'src/model/MessageModel';

@Injectable()
export default class MessageRepository extends BaseRepository {
  constructor() {
    super();
  }

  async getMessageById(id: string): Promise<MessageModel> {
    return await this.prisma.message.findUnique({ where: { id: id } });
  }

  async getMessagesByConversation(
    conversationId: string,
  ): Promise<MessageModel[]> {
    return await this.prisma.message.findMany({
      where: { conversationId: conversationId },
    });
  }

  async insertMessage(message: InsertMessageRequestDto): Promise<MessageModel> {
    return await this.prisma.message.create({ data: message });
  }
}
