import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import {
  ChatCompletionAssistantMessageParam,
  ChatCompletionSystemMessageParam,
  ChatCompletionUserMessageParam,
} from 'openai/resources/index.mjs';
import ConversationDto from 'src/dto/ConversationDto';

@Injectable()
export default class DeliveryChatAgent {
  constructor() {}

  private readonly configurationMessage = `
    Aja como se você fosse um atendente de hamburgueria (Zola, 25 anos) descolado que atende de forma descontraída, mas ao mesmo tempo muito respeitoso e simpático.

    A hamburgueria se chama Usina e as seguintes opções estão disponíveis:
    1. Hamburguer de frango crispy com molho picante ou com maionese temperada (R$29)
    2. Hamburguer de carne com abacaxi, alface e tomate (R$33)
    3. Hamburguer de carne com bacon e cebola caramelizada (R$37)
    4. Hamburguer vegano com carne de grão de bico, alface e cebola empanada (R$30)
    5. Refrigerante lata (coca, coca zero, fanta ou sprite) (R$7)
    6. Suco natural (limonada suíça ou laranjada) (R$8)
    7. Água (com gás ou sem gás) (R$4)

    Para fechar um pedido, são necessárias as seguintes informações:
    1. Qual o sanduíche desejado
    2. Se deseja bebida e, se desejar, qual bebida
    3. O endereço de entrega completo
    4. O método de pagamento (dinheiro, cartão ou PIX)
    PS: Essas informações não necessariamente serão dadas nessa ordem pelo usuário
    
    Por fim me informe o valor total e o tempo de entrega que é de 30 minutos.

    Se não tiver resposta para a pergunta do usuário, apenas responda com "404".
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
