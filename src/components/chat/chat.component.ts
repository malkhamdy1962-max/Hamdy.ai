import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, WritableSignal, afterNextRender, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GeminiService, Message } from '../../services/gemini.service';
import { ChatHistoryService } from '../../services/chat-history.service';
import { CognitiveStreamComponent } from '../cognitive-stream/cognitive-stream.component';
import { Chat } from '@google/genai';
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, CognitiveStreamComponent, SafeHtmlPipe],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent {
  private geminiService = inject(GeminiService);
  private chatHistoryService = inject(ChatHistoryService);

  messages: WritableSignal<Message[]> = signal([]);
  userInput = '';
  isLoading = signal(false);
  private chat!: Chat;

  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  constructor() {
    this.messages.set(this.chatHistoryService.loadHistory());
    this.chat = this.geminiService.startChat(this.messages());

    // Auto-scroll effect
    effect(() => {
      if (this.messages()) {
        afterNextRender(() => {
          this.scrollToBottom();
        });
      }
    });
  }

  async sendMessage() {
    const currentInput = this.userInput.trim();
    if (!currentInput || this.isLoading()) {
      return;
    }
    
    this.userInput = '';
    const userMessage: Message = { role: 'user', parts: [{ text: currentInput }] };
    this.messages.update(m => [...m, userMessage]);
    
    this.isLoading.set(true);
    let fullResponse = '';
    const modelMessage: Message = { role: 'model', parts: [{ text: '' }] };
    this.messages.update(m => [...m, modelMessage]);

    try {
      const stream = await this.chat.sendMessageStream({ message: currentInput });
      for await (const chunk of stream) {
        fullResponse += chunk.text;
        this.messages.update(m => {
            const lastMessage = m[m.length - 1];
            if(lastMessage.role === 'model') {
                lastMessage.parts = [{ text: fullResponse }];
            }
            return [...m];
        });
      }
    } catch (e) {
        console.error(e);
        this.messages.update(m => {
            const lastMessage = m[m.length - 1];
            if(lastMessage.role === 'model') {
                lastMessage.parts = [{ text: 'Sorry, I ran into an error.' }];
            }
            return [...m];
        });
    } finally {
        this.isLoading.set(false);
        this.chatHistoryService.saveHistory(this.messages());
    }
  }
  
  handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  private scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }
}