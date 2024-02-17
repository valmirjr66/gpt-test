import MessageDto from './MessageDto';

export default class ConversationDto {
  constructor(id: string, messages: MessageDto[]) {
    this.id = id;
    this.messages = messages;
  }

  id: string;
  messages: MessageDto[];
}
