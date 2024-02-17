type Roles = 'system' | 'user' | 'assistant';

export default class InsertMessageRequestDto {
  constructor(role: Roles, content: string, conversationId: string) {
    this.role = role;
    this.content = content;
    this.conversationId = conversationId;
  }

  role: Roles;
  content: string;
  conversationId: string;
}
