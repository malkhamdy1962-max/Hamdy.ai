import { ChangeDetectionStrategy, Component, WritableSignal, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GeminiService } from '../../services/gemini.service';
import { CognitiveStreamComponent } from '../cognitive-stream/cognitive-stream.component';
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';

@Component({
  selector: 'app-document-generator',
  standalone: true,
  imports: [CommonModule, FormsModule, CognitiveStreamComponent, SafeHtmlPipe],
  templateUrl: './document-generator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentGeneratorComponent {
  private geminiService = inject(GeminiService);

  docType = '';
  docPrompt = '';
  generatedDocument: WritableSignal<string> = signal('');
  isLoading = signal(false);

  async generateDocument() {
    if (!this.docType.trim() || !this.docPrompt.trim()) {
      return;
    }
    this.isLoading.set(true);
    this.generatedDocument.set('');
    
    const prompt = `
      As a legal expert assistant, generate a professional document.
      Document Type: ${this.docType}
      Instructions and Key Points:
      ---
      ${this.docPrompt}
      ---
      Please generate the document in a clear, well-structured format appropriate for the specified document type. Use markdown for formatting.
    `;

    try {
      const result = await this.geminiService.generateText(prompt);
      this.generatedDocument.set(result);
    } catch (error) {
      this.generatedDocument.set('An error occurred while generating the document. Please try again.');
      console.error(error);
    } finally {
      this.isLoading.set(false);
    }
  }
}