import { ChangeDetectionStrategy, Component, WritableSignal, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GeminiService } from '../../services/gemini.service';
import { CognitiveStreamComponent } from '../cognitive-stream/cognitive-stream.component';
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';

@Component({
  selector: 'app-longform-generator',
  standalone: true,
  imports: [CommonModule, FormsModule, CognitiveStreamComponent, SafeHtmlPipe],
  templateUrl: './longform-generator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LongformGeneratorComponent {
  private geminiService = inject(GeminiService);

  longformPrompt = '';
  generatedContent: WritableSignal<string> = signal('');
  isLoading = signal(false);

  async generateContent() {
    if (!this.longformPrompt.trim()) {
      return;
    }
    this.isLoading.set(true);
    this.generatedContent.set('');
    
    const prompt = `
      Generate a long-form piece of content based on the following prompt. 
      The content should be well-researched, engaging, and structured logically.
      Use markdown for formatting, including headings, lists, and bold text where appropriate.

      Prompt:
      ---
      ${this.longformPrompt}
      ---
    `;

    try {
      const result = await this.geminiService.generateText(prompt);
      this.generatedContent.set(result);
    } catch (error) {
      this.generatedContent.set('An error occurred while generating content. Please try again.');
      console.error(error);
    } finally {
      this.isLoading.set(false);
    }
  }
}