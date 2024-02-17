import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export default class ImageAgent {
  constructor() {}

  async generate(prompt: string): Promise<string> {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_SECRET_KEY });

    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: prompt,
      n: 1,
      size: '1024x1024',
    });

    return response.data[0].url;
  }
}
