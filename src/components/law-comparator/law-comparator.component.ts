import { ChangeDetectionStrategy, Component, WritableSignal, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GeminiService } from '../../services/gemini.service';
import { CognitiveStreamComponent } from '../cognitive-stream/cognitive-stream.component';
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';

@Component({
  selector: 'app-law-comparator',
  standalone: true,
  imports: [CommonModule, FormsModule, CognitiveStreamComponent, SafeHtmlPipe],
  templateUrl: './law-comparator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LawComparatorComponent {
  private geminiService = inject(GeminiService);

  lawText1 = '';
  lawText2 = '';
  comparisonResult: WritableSignal<string> = signal('');
  isLoading = signal(false);

  async compareTexts() {
    if (!this.lawText1.trim() || !this.lawText2.trim()) {
      return;
    }
    this.isLoading.set(true);
    this.comparisonResult.set('');
    
    const prompt = `
      As a legal expert assistant, compare the following two legal texts. 
      Provide a detailed analysis of their similarities and differences, focusing on key clauses, definitions, obligations, and legal implications.
      Present the output in well-structured markdown format.

      Text 1:
      ---
      ${this.lawText1}
      ---

      Text 2:
      ---
      ${this.lawText2}
      ---
    `;

    try {
      const result = await this.geminiService.generateText(prompt);
      this.comparisonResult.set(result);
    } catch (error) {
      this.comparisonResult.set('An error occurred during comparison. Please try again.');
      console.error(error);
    } finally {
      this.isLoading.set(false);
    }
  }
}