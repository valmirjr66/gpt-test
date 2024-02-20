type Roles = 'system' | 'user' | 'assistant';

export default class InsertMessageRequestDto {
  role: Roles;
  content: string;
  conversationId: string;

  constructor(role: Roles, content: string, conversationId: string) {
    this.role = role;
    this.content = content;
    this.conversationId = conversationId;
  }
}
