import { Injectable } from '@angular/core';
import { GoogleGenAI, Chat, Part } from '@google/genai';

// Assume process.env.API_KEY is available via build-time replacement
declare const process: {
  env: {
    API_KEY: string;
  }
};

export type Role = 'user' | 'model';

export interface Message {
  role: Role;
  parts: Part[];
  thinking?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class GeminiService {
  private genAI: GoogleGenAI = new GoogleGenAI({ apiKey: process.env.API_KEY });

  startChat(history: Message[]): Chat {
    return this.genAI.chats.create({
        model: 'gemini-2.5-flash',
        history: history,
        config: {
          systemInstruction: 'You are a helpful assistant named Hamdy, designed to assist law students and professionals in Egypt with legal research, document analysis, and case management.',
        }
    });
  }

  async generateText(prompt: string): Promise<string> {
    try {
      const response = await this.genAI.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      return response.text;
    } catch (error) {
      console.error('Error generating text:', error);
      return 'Sorry, I encountered an error while processing your request.';
    }
  }
}
