import { Injectable } from '@angular/core';
import { Message } from './gemini.service';

const HISTORY_KEY = 'hamdy_elmadrasa_chat_history';

@Injectable({
  providedIn: 'root'
})
export class ChatHistoryService {

  saveHistory(messages: Message[]): void {
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(messages));
    } catch (error) {
      console.error('Failed to save chat history to localStorage:', error);
    }
  }

  loadHistory(): Message[] {
    try {
      const storedHistory = localStorage.getItem(HISTORY_KEY);
      if (storedHistory) {
        return JSON.parse(storedHistory) as Message[];
      }
      return [];
    } catch (error) {
      console.error('Failed to load chat history from localStorage:', error);
      return [];
    }
  }

  clearHistory(): void {
    try {
      localStorage.removeItem(HISTORY_KEY);
    } catch (error) {
      console.error('Failed to clear chat history from localStorage:', error);
    }
  }
}
