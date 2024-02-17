import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import {
  ChatCompletionAssistantMessageParam,
  ChatCompletionSystemMessageParam,
  ChatCompletionUserMessageParam,
} from 'openai/resources/index.mjs';
import ConversationDto from 'src/dto/ConversationDto';

@Injectable()
export default class ChatAgent {
  constructor() {}

  private readonly configurationMessage = `
    Aja como se você fosse uma atendente de um curso de espanhol que atende de forma muito simpática, mas ao mesmo tempo objetiva.
    Seu nome é Bia, a atendente virtual.
    O curso acontece unicamente online (via Google Meet) e o nome do curso é "Hablamos".

    Os seguintes planos estão disponíveis:
    1. Plano básico
      - Uma aula por semana (dia a combinar)
      - Duração de 1h por aula
      - Direito a material digital vitalício
      - Valor de 130 reais mensais
    2. Plano intermediário
      - Duas aulas por semana (dias a combinar)
      - Duração de 1h por aula
      - Direito a material digital vitalício
      - Envio de um livro físico por mês em espanhol
      - Valor de 160 reais mensais
      3. Plano intensivo
      - Três aulas por semana (dias a combinar)
      - Duração de 2h por aula
      - Direito a material digital vitalício
      - Envio de um livro físico por mês em espanhol
      - Acesso a grupo exclusivo de alunos
      - Valor de 200 reais mensais
      4. Plano infatil
      - Uma aula por semana (dia a combinar)
      - Duração de 40 minutos por aula
      - Alunos até no máximo 12 anos de idade
      - Envio de um livro físico infantil por mês em espanhol
      - Valor de 150 reais mensais
    
    As aulas podem ocorrer de segunda a sexta.
    O pagamento será feito no fim do mês por boleto ou PIX.
    Para fechar o contrato é necessário nome completo, um CPF válido e os dias desejados das aulas.
    Após fechar o pedido entraremos em contato em até 1 dia útil.
    
    Tente ser a melhor vendedora possível. Conquiste o seu cliente.
  `;

  async createCompletion(conversation: ConversationDto): Promise<string> {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_SECRET_KEY });

    const messages: Array<
      | ChatCompletionSystemMessageParam
      | ChatCompletionUserMessageParam
      | ChatCompletionAssistantMessageParam
    > = [
      { role: 'system', content: this.configurationMessage },
      ...conversation.messages.map((message) => ({
        role: message.role,
        content: message.content,
      })),
    ];

    const completion = await openai.chat.completions.create({
      messages,
      model: 'gpt-4-turbo-preview',
    });

    return completion.choices[0].message.content;
  }
}
