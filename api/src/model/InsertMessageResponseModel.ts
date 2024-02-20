type Roles = 'system' | 'user' | 'assistant';

export default class InsertMessageResponseModel {
  id: string;
  content: string;
  role: Roles;
  conversationId: string;

  constructor(
    id: string,
    content: string,
    role: Roles,
    conversationId: string,
  ) {
    this.id = id;
    this.content = content;
    this.role = role;
    this.conversationId = conversationId;
  }
}
