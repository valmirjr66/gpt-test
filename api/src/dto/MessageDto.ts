type Roles = 'system' | 'user' | 'assistant';

export default class MessageDto {
  id: string;
  role: Roles;
  content: string;

  constructor(id: string, role: Roles, content: string) {
    this.id = id;
    this.role = role;
    this.content = content;
  }
}
